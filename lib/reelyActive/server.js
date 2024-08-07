const fs = require("fs");
const http = require("http");
const https = require("https");

const CONFIG_PATH = process.env.PARETO_ANYWHERE_CONFIG_PATH || "config";

function createServer(app, options) {
  let server;

  try {
    let credentials = {
      cert: fs.readFileSync(path.resolve(CONFIG_PATH + "/certificate.pem")),
      key: fs.readFileSync(path.resolve(CONFIG_PATH + "/key.pem")),
    };
    server = https.createServer(credentials, app);
  } catch (err) {
    console.log("Websockets Example by reelyActive is using HTTP");
    return http.createServer(app);
  }

  console.log("Websockets Example by reelyActive is using HTTPS");
  return server;
}

module.exports = { createServer };
