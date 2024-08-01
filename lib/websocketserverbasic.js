/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */

const WebSocket = require("ws");
const url = require("url");
var http = require("http");

const DEFAULT_PORT = 3001;
const DEFAULT_PRINT_ERRORS = false;

const authenticate = (request) => {
  const { token } = url.parse(request.url, true).query;
  return token === process.env.ACCESS_TOKEN;
};

/**
 * WebSocketServerBasic Class
 * Detects events and sends notifications.
 */
class WebSocketServerBasic {
  /**
   * WebSocketServerBasic constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    let self = this;
    options = options || {};

    self.printErrors = options.printErrors || DEFAULT_PRINT_ERRORS;

    // Use the provided WebSocket server instance
    if (options.wss) {
      self.wss = options.wss;
    }

    // Use the provided HTTP(S) server
    else if (options.server) {
      self.wss = new WebSocket.WebSocketServer({ server: options.server });
    }

    // Have WebSocketServer create a new server on the given port
    else {
      console.log("No servers provided");
      self.server = http.createServer(function (request, response) {
        console.log(new Date() + " Received request for " + request.url);
      });

      let port = options.port || DEFAULT_PORT;
      self.wss = new WebSocket.WebSocketServer({ noServer: true });

      self.server.listen(port, "127.0.0.1", function () {
        console.log(new Date() + " Server is listening on port " + port);
      });

      self.server.on("upgrade", function (request, socket, head) {
        if (authenticate(request) === false) {
          console.log("Unable to authenticate. Closing connection.");
          socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
          socket.destroy();
          return;
        }
        self.wss.handleUpgrade(request, socket, head, (connection) => {
          self.wss.emit("connection", connection, request);
        });
      });
    }

    self.wss.on("connection", (ws) => {
      console.log("connection");
      ws.send("connected");
      if (self.printErrors) {
        ws.on("error", console.error);
      }
    });
  }

  /**
   * Handle an outbound event.
   * @param {String} name The event name.
   * @param {Object} data The outbound event data.
   */
  handleEvent(name, data) {
    let self = this;

    console.log(
      "handleEvent: " + JSON.stringify({ type: "dynamb", data: data })
    );
    switch (name) {
      case "dynamb":
        return handleDynamb(self, data);
    }
  }
}

/**
 * Handle the given dynamb by relaying it.
 * @param {WebSocketServerBasic} instance //The WebSocketServerBasic instance.
 * @param {Object} dynamb The dynamb data.
 */
function handleDynamb(instance, dynamb) {
  let message = JSON.stringify({ type: "dynamb", data: dynamb });
  // TODO: add sequence number
  instance.wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = WebSocketServerBasic;
