"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var logger = require("morgan");
var apollo_server_express_1 = require("apollo-server-express");
var settings_1 = require("./settings");
var graphql_1 = require("./graphql");
var db_1 = require("./db");
// Create Express server
var app = express();
// Express configuration
app.set("port", settings_1.port);
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// The GraphQL endpoint
app.use("/" + settings_1.endpoint, bodyParser.json(), apollo_server_express_1.graphqlExpress(function (req) {
    return {
        schema: graphql_1["default"],
        context: {
            db: db_1["default"]
        },
        debug: settings_1.debug
    };
}));
if (settings_1.debug) {
    // GraphiQL, a visual editor for queries
    app.use("/graphiql", apollo_server_express_1.graphiqlExpress({ endpointURL: "/" + settings_1.endpoint }));
}
exports["default"] = app;
//# sourceMappingURL=app.js.map