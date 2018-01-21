const { tester } = require("graphql-tester");

module.exports = tester({
  url: `http://localhost:${process.env.SERVICE_PORT}${
    process.env.SERVICE_ENDPOINT
  }`,
  contentType: "application/json"
});
