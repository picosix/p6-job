"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var settings_1 = require("./settings");
var user_schema_1 = require("./services/XUser/user.schema");
// Mongoose config
mongoose.connect(settings_1.mongoUri, { useMongoClient: true });
/**
 * To fix message "Cannot assign to 'Promise'
 * because it is a constant or a read-only property"
 * Use (<any>mongoose).Promise = bluebird;
 */
mongoose.Promise = bluebird;
// Defined model
mongoose.model("User", user_schema_1["default"]);
exports["default"] = mongoose;
//# sourceMappingURL=db.js.map