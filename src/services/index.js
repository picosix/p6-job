const { mergeSchemas } = require("graphql-tools");

const userSchema = require("./XUser");

module.exports = mergeSchemas({
  schemas: [userSchema]
});
