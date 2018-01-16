import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

import resolvers from "./resolver";
import schema from "./schema";

const postSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers
});

export default postSchema;
