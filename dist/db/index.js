"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var settings_1 = require("../settings");
// Mongoose config
mongoose.connect(settings_1.mongoUri, { useMongoClient: true });
/**
 * To fix message "Cannot assign to 'Promise'
 * because it is a constant or a read-only property"
 * Use (<any>mongoose).Promise = bluebird;
 */
mongoose.Promise = bluebird;
exports["default"] = mongoose;
//# sourceMappingURL=index.js.map