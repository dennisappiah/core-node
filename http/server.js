const http = require("node:http");

// Create an instance of the HTTP server
const server = http.createServer();

// Listen for 'request' events on the server
server.on("request", (request, response) => {
  console.log("Request Headers:", request.headers);

  // Extract the custom header 'name' from the request headers
  const name = request.headers.name;

  console.log("Request URL:", request.url);

  // Initialize a variable to accumulate the request body data
  let data = "";

  // Listen for 'data' events to receive chunks of the request body
  request.on("data", (chunk) => {
    data += chunk.toString();
  });

  // Listen for the 'end' event which signifies the end of the request body
  request.on("end", () => {
    data = JSON.parse(data);

    // Send a JSON response back to the client
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        message: `Post with title '${data.title}' was created by '${name}'`,
      })
    );
  });

  // Handle errors that may occur during request processing
  request.on("error", (err) => {
    console.error(`Request error: ${err.message}`);
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        error: "Internal Server Error",
      })
    );
  });
});

// Start the server and listen on port 8050
server.listen(8050, () => {
  console.log(`Server listening on http://localhost:8050`);
});
