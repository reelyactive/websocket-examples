const WebSocket = require("ws");

// The PORT and URL can be defined as environment variables
// or they will default to the values below.
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3001;
const WEBSOCKET_URL =
  "ws://" +
  (process.env.WEBSOCKET_URL || "localhost") +
  ":" +
  WEBSOCKET_PORT +
  "?token=" +
  process.env.ACCESS_TOKEN;

/**
 * WebSocketClient Class
 * Detects events and sends notifications.
 */
class WebSocketClient {
  constructor(options) {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.on("open", () => {
      console.warn(
        "WARNING: Do not log the URL in production, it may contain",
        "\n",
        "        sensitive information such as an access token.",
        "\n",
        "        This is for example and debugging purposes only."
      );
      console.log("Connecting to webSocket server at: ", WEBSOCKET_URL);

      // Send a message to the server
      ws.send("Whooo's ready to say hello?");
    });

    ws.on("connection", (ws) => {
      console.log("client connected.");
      ws.send("Whooo's ready to say hello?");
    });

    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
    });

    ws.on("error", (error) => {
      console.error(`WebSocket error: ${error}`);
    });

    ws.on("close", () => {
      console.log("Disconnected from the WebSocket server");
    });
  }
}

module.exports = WebSocketClient;
