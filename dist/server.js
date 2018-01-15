"use strict";
exports.__esModule = true;
var errorHandler = require("errorhandler");
var settings_1 = require("./settings");
var app_1 = require("./app");
var db_1 = require("./db");
/**
 * Error Handler. Provides full stack
 * Remove fro production
 */
if (settings_1.debug) {
    app_1["default"].use(errorHandler());
}
/**
 * Start Express server.
 * Make sure mongoose is ready
 */
db_1["default"].connection.on("open", function () {
    return app_1["default"].listen(app_1["default"].get("port"), settings_1.debug
        ? console.log.bind(undefined, "App is running at http://localhost:%d in %s mode", app_1["default"].get("port"), app_1["default"].get("env"))
        : undefined);
});
db_1["default"].connection.on("error", console.log);
//# sourceMappingURL=server.js.map