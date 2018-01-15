"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
// Load dotenv config
dotenv.config({ path: ".env" });
// Export settings
exports.debug = process.env.NODE_ENV !== "production";
exports.mongoUri = process.env.MONGO_URI;
exports.version = process.env.API_VERSION || "v1";
//# sourceMappingURL=index.js.map