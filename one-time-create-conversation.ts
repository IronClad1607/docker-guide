import axios from "axios";
import fs from "fs";

// Base API URL
const BASE_URL = "https://betaauth.likeminds.community";

// API Endpoints
const ACCESS_TOKEN_ENDPOINT = "/sdk/initiate";
const CREATE_CONVERSATION_ENDPOINT = "/conversation";

// Counter file path
const COUNTER_FILE = "counter.txt";

// Common headers for both API calls (excluding x-api-key)
const COMMON_HEADERS = {
  "x-sdk-source": "chat",
  "x-platform-code": "an",
  "x-version-code": "340",
};

// Logger function
function logMessage(message: string) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Function to get access token
async function getAccessToken(
  uuid: string,
  deviceId: string,
  apiKey: string
): Promise<string> {
  logMessage(`Fetching access token for UUID: ${uuid}, Device ID: ${deviceId}`);
  try {
    const response = await axios.post(
      `${BASE_URL}${ACCESS_TOKEN_ENDPOINT}`,
      { uuid, device_id: deviceId },
      {
        headers: {
          ...COMMON_HEADERS,
          "x-api-key": apiKey, // Adding API Key dynamically
        },
      }
    );

    if (response.data.data && response.data.data.access_token) {
      logMessage("Access token retrieved successfully.");
      return response.data.data.access_token;
    } else {
      throw new Error("Invalid response structure: Missing access token");
    }
  } catch (error: any) {
    logMessage(`Error getting access token: ${error.message}`);
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
    }
    throw error;
  }
}

// Function to create conversation using access token
async function createConversation(
  accessToken: string,
  temporaryId: string,
  text: string,
  chatroomId: string
): Promise<void> {
  logMessage(
    `Creating conversation in chatroom: ${chatroomId} with message: "${text}"`
  );
  try {
    const response = await axios.post(
      `${BASE_URL}${CREATE_CONVERSATION_ENDPOINT}`,
      {
        temporary_id: temporaryId,
        text,
        chatroom_id: chatroomId,
      },
      {
        headers: {
          ...COMMON_HEADERS,
          Authorization: `Bearer ${accessToken}`,
          "x-api-version": "1", // Ensure x-api-version value is set correctly
        },
      }
    );

    if (response.data) {
      logMessage("Conversation created successfully.");
      console.log("Response:", response.data);
    } else {
      throw new Error("Invalid response structure: Missing conversation data");
    }
  } catch (error: any) {
    logMessage(`Error creating conversation: ${error.message}`);
    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
    }
    throw error;
  }
}

// Function to get the current counter value
function getCounter(): number {
  try {
    if (fs.existsSync(COUNTER_FILE)) {
      const counter = fs.readFileSync(COUNTER_FILE, "utf8");
      return parseInt(counter, 10) || 0;
    } else {
      return 0;
    }
  } catch (error) {
    logMessage("Error reading counter file. Defaulting to 0.");
    return 0;
  }
}

// Function to increment and save counter
function updateCounter(counter: number): void {
  try {
    fs.writeFileSync(COUNTER_FILE, counter.toString(), "utf8");
    logMessage(`Counter updated: ${counter}`);
  } catch (error) {
    logMessage("Error updating counter file.");
  }
}

// Main function to execute the flow
async function main() {
  logMessage("Starting execution...");

  try {
    const uuid = "sssss"; // Replace with actual UUID
    const deviceId = "device-a"; // Replace with actual device ID
    const apiKey = "95380389-b90b-4e45-b329-d27de0846c9b"; // Replace with actual API Key (dynamic input)

    // Read and increment the counter
    let counter = getCounter();
    counter++;
    updateCounter(counter);

    // Get access token with API key
    const accessToken = await getAccessToken(uuid, deviceId, apiKey);

    logMessage(`accessToken: ${accessToken}`);

    const temporaryId = `temp-${counter}`;
    const text = `Hello, this is message number ${counter}`;
    const chatroomId = "100412"; // Replace with actual chatroom ID

    // Create conversation using the retrieved access token
    await createConversation(accessToken, temporaryId, text, chatroomId);
  } catch (error) {
    logMessage("Error encountered in conversation creation flow.");
    console.error(error);
  } finally {
    logMessage("Execution completed.");
  }
}

// Execute the main function
main();
