const { tester } = require("graphql-tester");

module.exports = tester({
  url: `http://localhost:${process.env.API_PORT}${process.env.API_ENDPOINT}`,
  contentType: "application/json"
});
