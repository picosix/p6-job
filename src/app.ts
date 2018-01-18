import * as express from "express";
import { Request } from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as logger from "morgan";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import { port, debug, endpoint } from "./settings";
import schema from "./graphql";
import db from "./db";

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
  `/${endpoint}`,
  bodyParser.json(),
  graphqlExpress((req: Request) => {
    return {
      schema,
      context: {
        db
      },
      debug
    };
  })
);

if (debug) {
  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: `/${endpoint}` }));
}

export default app;
