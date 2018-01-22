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
    const { _page = 0, _sort = {} } = variables;

    // Paging mapping
    const page = _.isNumber(_page) && !_.isNaN(_page) ? _page - 1 : 0;
    const offset = (page > 0 ? page : 0) * doc.limit;
    // Sort mapping
    const { asc = "", desc = "" } = _sort;
    const ascSort = asc
      .split(",")
      .map(field => (field.trim() ? `${field.trim()}` : ""));
    const descSort = desc
      .split(",")
      .map(field => (field.trim() ? `-${field.trim()}` : ""));
    const sort = [...ascSort, ...descSort].join(" ");

    return {
      schema,
      context: {
        _paging: {
          offset,
          limit: doc.limit
        },
        _ordering: sort
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
