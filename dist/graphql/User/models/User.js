"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var lodash_1 = require("lodash");
mongoose.Promise = bluebird;
// Constants
exports.STATUS_BLOCKED = -1;
exports.STATUS_INACTIVE = 1;
exports.STATUS_ACTIVE = 1;
exports.TOKEN_TYPE_ACTIVATE = 1;
exports.TOKEN_TYPE_RESET_PASSWORD = 2;
// Defined Mongoose schema
var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 5, max: 255 },
    status: {
        type: Number,
        "default": exports.STATUS_ACTIVE,
        "enum": [exports.STATUS_BLOCKED, exports.STATUS_INACTIVE, exports.STATUS_ACTIVE]
    },
    profile: {
        firstName: { type: String, max: 255 },
        lastName: { type: String, max: 255 },
        avatar: String
    }
}, { timestamps: true });
userSchema.pre("save", function preSave(next) {
    // Both username and email must be in lowercase
    this.username = lodash_1.toLower(this.username);
    this.email = lodash_1.toLower(this.email);
    next();
});
// Defined model
var User = mongoose.model("User", userSchema);
exports["default"] = User;
//# sourceMappingURL=User.js.map