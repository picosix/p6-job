const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { paging, ordering } = require("./utils");
const { debug, auth, service, endpoint, doc } = require("./settings");
const { authentication, authorize } = require("./auth");
const schema = require("./services");

// Create Express server
const app = express();

// Express configuration
app.set("port", service.port);
app.use(compression());
app.use(bodyParser.json());

// Authentication midleware
app.use(authentication(auth.secretKey));
// The GraphQL endpoint
app.use(
  service.endpoint,
  bodyParser.json(),
  graphqlExpress(req => {
    const { variables = {} } = req.body || {};
    const { _page = 0, _sort = {} } = variables;

    return {
      schema,
      context: {
        paging: paging(_page, doc.limit),
        ordering: ordering(_sort),
        auth
      },
      debug,
      validationRules: [authorize(async () => true)]
    };
  })
);

if (debug) {
  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: service.endpoint }));
}

module.exports = app;
