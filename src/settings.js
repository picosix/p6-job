const _ = require("lodash");

const limit = Number(process.env.DOC_LIMIT);

module.exports = {
  debug: process.env.NODE_ENV !== "production",
  db: {
    uri: process.env.MONGO_URI || ""
  },
  secretKey: process.env.SECRET_KEY || "yoursecretkey",
  service: {
    port: process.env.SERVICE_PORT || 9999,
    endpoint: process.env.SERVICE_ENDPOINT || "/graphql"
  },
  doc: {
    limit: !_.isNaN(limit) ? limit : 20
  }
};
