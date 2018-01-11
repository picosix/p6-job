import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as logger from "morgan";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

import { debug } from "./settings";
// --- BEGIN ---
// Some fake data
const users = [
  {
    id: "random",
    username: "picosix",
    email: "picosix.com@gmail.com",
    status: 1,
    firstName: "Tuan",
    lastName: "Nguyen"
  }
];

// The resolvers
const resolvers = {
  Query: { users: async () => users }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs: importSchema(`${__dirname}/graphql/schema.graphql`),
  resolvers
});
// --- END ---

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
