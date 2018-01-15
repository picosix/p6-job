"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
// Constants
exports.STATUS_BLOCKED = -1;
exports.STATUS_INACTIVE = 1;
exports.STATUS_ACTIVE = 1;
exports.TOKEN_TYPE_ACTIVATE = 1;
exports.TOKEN_TYPE_RESET_PASSWORD = 2;
// Defined Mongoose schema
var userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 5, max: 255 },
    status: {
        type: Number,
        "default": exports.STATUS_ACTIVE,
        "enum": [exports.STATUS_BLOCKED, exports.STATUS_INACTIVE, exports.STATUS_ACTIVE]
    },
    source: { type: String, required: true },
    token: {
        token: { type: String, required: true, unique: true },
        expiredAt: { type: Date, required: true, "default": Date.now() },
        type: {
            type: Number,
            required: true,
            "enum": [exports.TOKEN_TYPE_ACTIVATE, exports.TOKEN_TYPE_RESET_PASSWORD]
        }
    },
    profile: {
        firstName: { type: String, max: 255 },
        lastName: { type: String, max: 255 },
        avatar: { type: String }
    }
}, { timestamps: true });
// Defined model
exports["default"] = userSchema;
//# sourceMappingURL=user.schema.js.map