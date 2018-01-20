const { makeExecutableSchema } = require("graphql-tools");

const type = require("./type");
const input = require("./input");
const root = require("./root");

module.exports = [type, input, root];
