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
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiWVRVSWhFMFl0UENTN2pFRkRHaUFqVm1PNmVxUjlSZlVjRWozVThwOHVObDVmZk5ISVFrdDJtZ1FnOFpsRFo5SWNtbHlVckZMOFRXUEpmcVN2NzVrcXNNM1pweWRHVXdOWC9BV2thR2lSVW9lL2FlNlIvakpZaDMrUXRBS3dLSUlmZTRzWm8zUFQ4YkFNQlpYdUNFZ3hVVGRZMy8vdHhtQ3MyeDZmYnl0ZjdaMmQxZC96STRhTlBWMFdJejlDdEdzWS9sdzNOaHJhdEtrOVJ0K2gwUkZSYWNKVysyYkVBdmtNQ2tNUkhONmYyS2xWUDRPUlcxNjFCd3BNNUhkekl4WmN4RzAxL28rQW1mR1NlMndHL0wzTzJ6RnRqK2JveHFzUGFRNyIsImV4cCI6MTcyODA2NDUzMn0.ytgo1P9dnPG0Xzxuqa2KLFh-nGw3a7XoH04MDqeUsho", // Example of an Authorization header
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
      chatroom_id: "74937",
      temporary_id: "-9080000",
      text: `from script: load testing ${94 + i}`,
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
