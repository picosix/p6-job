import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { resolve } from "path";

import resolvers from "./resolvers";

export default makeExecutableSchema({
  typeDefs: importSchema(resolve(__dirname, "schemas/schema.graphql")),
  resolvers
});
