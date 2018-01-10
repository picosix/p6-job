import * as express from "express";
import * as bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

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

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
