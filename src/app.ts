import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as logger from "morgan";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

import { debug, version } from "./settings";
import db from "./db";
import schema from "./graphql";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 9999);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The GraphQL endpoint
app.use(`/${version}`, bodyParser.json(), graphqlExpress({ schema }));

if (debug) {
  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: `/${version}` }));
}

export default app;
