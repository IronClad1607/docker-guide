const axios = require("axios");

// The REST API URL
const apiUrl = "https://betaauth.likeminds.community/conversation";

// Number of requests
const numRequests = 200;

// Delay between requests (optional, in milliseconds)
const delay = 200; // Adjust delay to avoid overloading the server

// Data to be sent in POST requests;

// Custom headers
const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibzBWQXltTGluS3hKOWRFRHRzQndTU2Zvb2VoMnBPbUxoU0RZd0U0SDlsWFlreG5Ub2wxemxVUDFkZ0o0NkZ2VjR0VFJJRVZFWHJKUnVYKzBydmo2VEJ0czJLMldDVHNaTGxhN1BrQnlsLzVYZFlMWEpnYi9Ma3k2eHdZOGx4M0NLMkVEMUh4RGhNajJIS3BibWtycEN1MFQzOFJaeHJ6eEZ2cVYzaGpuL05HbFFZR051NWowaFhEQllMWmtnNUdMNDJkT1lHR3VMRldUVmF6bDR0Vy9XR3BXMVp3ZUQ2bGQ4U1NKQ3diWUlENHNqY1NZTTBRYVdVYnBDSEw5RXJWTzJPbGZxaHFnUmZVMUMySEp2NUhxMXRrSnJaa1NQYzFUQWFwRSIsImV4cCI6MTcyODQ3Nzg4NH0.WOpxMeM5ts268o6_ylfyw7i5MAUsK26yJ4fe-bMQ--E", // Example of an Authorization header
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
      chatroom_id: "99346",
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
