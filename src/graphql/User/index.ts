import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";

import resolvers from "./resolver";
import schema from "./schema";

const userSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers
});

export default userSchema;
