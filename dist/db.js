"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var settings_1 = require("./settings");
// Mongoose config
mongoose
    .connect(settings_1.mongoUri, { useMongoClient: true })
    .then(function () { })["catch"](function (err) {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});
/**
 * To fix message "Cannot assign to 'Promise'
 * because it is a constant or a read-only property"
 * Use (<any>mongoose).Promise = bluebird;
 */
mongoose.Promise = bluebird;
exports["default"] = mongoose;
//# sourceMappingURL=db.js.map