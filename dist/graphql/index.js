"use strict";
exports.__esModule = true;
var graphql_import_1 = require("graphql-import");
var graphql_tools_1 = require("graphql-tools");
var path_1 = require("path");
var resolvers_1 = require("./resolvers");
exports["default"] = graphql_tools_1.makeExecutableSchema({
    typeDefs: graphql_import_1.importSchema(path_1.resolve(__dirname, "../../schemas/schema.graphql")),
    resolvers: resolvers_1["default"]
});
//# sourceMappingURL=index.js.map