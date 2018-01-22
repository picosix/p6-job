const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { paging, ordering } = require("./utils");
const { debug, auth, service, endpoint, doc } = require("./settings");
const { authentication, auhthorization } = require("./auth");
const { typeDefs, resolvers } = require("./services");

// The customized GraphQL
const graphQlSchema = require("./graphql/schemas");
const { authorizedOperation } = require("./graphql/rules");

// Create Express server
const app = express();

// Express configuration
app.set("port", service.port);
app.use(compression());
app.use(bodyParser.json());

// The authentication midleware
app.use(authentication(auth.secretKey));

// The GraphQL schema
const schema = makeExecutableSchema({
  typeDefs: [...graphQlSchema, ...typeDefs],
  resolvers
});
// The GraphQL endpoint
app.use(
  service.endpoint,
  bodyParser.json(),
  graphqlExpress(req => {
    const { variables = {} } = req.body || {};
    const { _page = 0, _sort = {} } = variables;

    // The GraphQL validation rules
    const validationRules = [authorizedOperation(auhthorization(req._user))];

    return {
      schema,
      context: {
        paging: paging(_page, doc.limit),
        ordering: ordering(_sort),
        auth
      },
      validationRules,
      debug
    };
  })
);

if (debug) {
  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: service.endpoint }));
}

module.exports = app;
