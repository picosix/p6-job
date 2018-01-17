"use strict";
exports.__esModule = true;
var graphql_tools_1 = require("graphql-tools");
var User_1 = require("./User");
var Post_1 = require("./Post");
exports["default"] = graphql_tools_1.mergeSchemas({
    schemas: [User_1["default"], Post_1["default"]]
});
//# sourceMappingURL=index.js.map