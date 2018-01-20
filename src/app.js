const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { port, debug, endpoint } = require("./settings");
const schema = require("./services");

// Create Express server
const app = express();

// Express configuration
app.set("port", port);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The GraphQL endpoint
app.use(
  endpoint,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    debug
  }))
);

if (debug) {
  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: endpoint }));
}

module.exports = app;
