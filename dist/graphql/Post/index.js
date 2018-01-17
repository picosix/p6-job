"use strict";
exports.__esModule = true;
var graphql_tools_1 = require("graphql-tools");
var resolver_1 = require("./resolver");
var schema_1 = require("./schema");
var postSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [schema_1["default"]],
    resolvers: resolver_1["default"]
});
exports["default"] = postSchema;
//# sourceMappingURL=index.js.map