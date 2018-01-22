const _ = require("lodash");

// Service schemas
const { schemas: userSchema, resolvers: userResolvers } = require("./XUser");

const typeDefs = [...userSchema];
const resolvers = _.merge({}, userResolvers);

module.exports = { typeDefs, resolvers };
