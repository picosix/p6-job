"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var logger = require("morgan");
var apollo_server_express_1 = require("apollo-server-express");
var settings_1 = require("./settings");
var graphql_1 = require("./graphql");
// Create Express server
var app = express();
// Express configuration
app.set("port", process.env.PORT || 9999);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// The GraphQL endpoint
app.use("/" + settings_1.version, bodyParser.json(), apollo_server_express_1.graphqlExpress({ schema: graphql_1["default"] }));
if (settings_1.debug) {
    // GraphiQL, a visual editor for queries
    app.use("/graphiql", apollo_server_express_1.graphiqlExpress({ endpointURL: "/" + settings_1.version }));
}
exports["default"] = app;
//# sourceMappingURL=app.js.map