"use strict";
exports.__esModule = true;
var graphql_tools_1 = require("graphql-tools");
var User_1 = require("./User");
var User_2 = require("./User");
exports["default"] = graphql_tools_1.mergeSchemas({
    schemas: [User_1["default"], User_2["default"]]
});
//# sourceMappingURL=index.js.map