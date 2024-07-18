const http = require("node:http");

// Create an instance of http.Agent to manage HTTP keep-alive connections
const agent = new http.Agent({ keepAlive: true });

// Configure the HTTP request options
const requestOptions = {
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "Content-Type": "application/json", // Specifying the media type for the request body
    name: "dennis", // Custom request header added

    // "Content-Length": 55, // Explicitly setting the content length (adjust according to the actual data length)
  },
};

// Create an HTTP request
const request = http.request(requestOptions, (response) => {
  console.log("------RESPONSE STATUS-----");
  console.log(response.statusCode); // Log the response status code

  console.log("------RESPONSE HEADERS-----");
  console.log(response.headers); // Log the response headers

  console.log("------RESPONSE BODY CHUNKS-----");
  response.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });

  response.on("end", () => {
    console.log("No more data in response"); // Log when the response has ended
  });
});

// Send the request body as a JSON string to server
request.end(
  JSON.stringify({
    title: "Title of my post",
    body: "This is some text and more!",
  })
);

// Handle request error events
request.on("error", (err) => {
  console.error(`Request error: ${err.message}`); // Log any request errors
});
