const { makeExecutableSchema } = require("graphql-tools");
const _ = require("lodash");

// General schemas
const generalSchema = require("./schemas");

// Service schemas
const { schemas: userSchema, resolvers: userResolvers } = require("./XUser");

module.exports = makeExecutableSchema({
  typeDefs: [...generalSchema, ...userSchema],
  resolvers: _.merge({}, userResolvers)
});
