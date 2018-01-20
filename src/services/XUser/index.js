const { makeExecutableSchema } = require("graphql-tools");

const resolvers = require("./resolvers");
const schemas = require("./schemas");

module.exports = makeExecutableSchema({
  typeDefs: [...schemas],
  resolvers
});
