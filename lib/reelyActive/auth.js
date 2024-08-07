const url = require("url");

const authenticate = (request) => {
  const { token } = url.parse(request.url, true).query;

  if (process.env.ACCESS_TOKEN === undefined) {
    console.warn("======================================================");
    console.warn("WARNING: No ACCESS_TOKEN environment variable defined.");
    console.warn("         Allowing all connections, this is not secure!");
    console.warn("         Define an ACCESS_TOKEN environment variable.");
    console.warn("======================================================");
    return true;
  }

  return token === process.env.ACCESS_TOKEN;
};

module.exports = { authenticate };
