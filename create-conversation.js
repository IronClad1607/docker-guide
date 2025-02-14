const axios = require("axios");

// The REST API URL
const apiUrl = "https://auth.likeminds.community/conversation";

// Number of requests
const numRequests = 200;

// Delay between requests (optional, in milliseconds)
const delay = 200; // Adjust delay to avoid overloading the server

// Data to be sent in POST requests;

// Custom headers
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRTU2eWJSczRORTFzKzVMa2JPR0tVZGtWbkFxUHNoMGpMTkdIdWpiSWM1dGFmejdramJocmJwTHd0ZG1wbDc4QmtROFlibUNodlczT09KMDhkdkxMNTVMaEFOMDhXZ2R3Ynk4eEM4S1UzSVRhMHFudi9rN04yTi92MU0rNlpaeWtYV3BwRTZqZmM3N28xaDlhWmgzNW1kYnZVdjg2V3h4UFN5eGZSWjlja2ZSQmpUSkJxeGRtb3NacStabXYrRGR6c2w2NHpGMHc5Y3ZOQ0x0QllrdXRzcE5KWnJuaFJpTmxhNzdtdmY0My9LakovTG9uL2VvZGl6UXRTY3VzTnhrZHYrTGZ3RnJBb3p0UDNMNVAvSkFzWDIxOTdheGJ2K1FDd2NsbyIsImV4cCI6MTczMzgyOTgwNn0.q0Dtb9RL4APxL8HfMXTc8I7j8g3zb2s6AO_ynZhcjjE", // Example of an Authorization header
  "Content-Type": "application/json", // Example content type (application/json)
  "x-version-code": 314,
  "x-platform-code": "an",
  "x-api-version": 1,
  "x-sdk-source": "chat",
};

// Function to make a POST request with headers
const makePostRequest = async (i) => {
  try {
    const postData = {
      chatroom_id: "4310567",
      temporary_id: "-9080000",
      text: `message ${i}`,
      // Add more key-value pairs as needed
    }
    const response = await axios.post(apiUrl, postData, { headers });
    console.log(`Request ${i + 1}: Status ${response.status}`);
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.log(
        `Request ${i + 1}: Error ${error.response.status} - ${
          error.response.statusText
        }`
      );
    } else if (error.request) {
      // No response received
      console.log(`Request ${i + 1}: No response from server`);
    } else {
      // Other error
      console.log(`Request ${i + 1}: Error ${error.message}`);
    }
  }
};

// Function to send POST requests with delay
const sendPostRequests = async () => {
  for (let i = 0; i < numRequests; i++) {
    console.log(`Sending POST request ${i + 1}...`);
    await makePostRequest(i);
    await new Promise((resolve) => setTimeout(resolve, delay)); // Delay between requests
  }
};

// Start sending POST requests
sendPostRequests();
