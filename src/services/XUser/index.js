const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");

const resolvers = require("./resolver");
const schema = require("./schema");

module.exports = makeExecutableSchema({
  typeDefs: [schema],
  resolvers
});
