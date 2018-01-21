const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const _ = require("lodash");

const { debug, service, endpoint, doc } = require("./settings");
const schema = require("./services");

// Create Express server
const app = express();

// Express configuration
app.set("port", service.port);
app.use(compression());
app.use(bodyParser.json());

// The GraphQL endpoint
app.use(
  service.endpoint,
  bodyParser.json(),
  graphqlExpress(req => {
    const { variables = {} } = req.body || {};
    const { _page = 0 } = variables;
    const page = _.isNumber(_page) && !_.isNaN(_page) ? _page - 1 : 0;
    const offset = (page > 0 ? page : 0) * doc.limit;

    return {
      schema,
      context: {
        _doc: {
          offset,
          limit: doc.limit
        }
      },
      debug
    };
  })
);

if (debug) {
  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: service.endpoint }));
}

module.exports = app;
