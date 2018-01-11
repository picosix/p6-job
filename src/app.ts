import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as logger from "morgan";
import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

import { debug, mongoUri } from "./settings";
import schema from "./graphql";

// Mongoose config
mongoose.connect(mongoUri, { useMongoClient: true });
/**
 * To fix message "Cannot assign to 'Promise'
 * because it is a constant or a read-only property"
 * Use (<any>mongoose).Promise = bluebird;
 */
(<any>mongoose).Promise = bluebird;

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 9999);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

if (debug) {
  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
}

export default app;
