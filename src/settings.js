const _ = require("lodash");

const limit = Number(process.env.DOC_LIMIT);

module.exports = {
  debug: process.env.NODE_ENV !== "production",
  db: {
    uri: process.env.MONGO_URI || ""
  },
  auth: {
    secretKey: process.env.AUTH_SECRET_KEY || "yoursecretkey",
    expiresIn: {
      accessToken: process.env.AUTH_ACCESS_TOKEN_EXPIRED || "1d",
      refreshToken: process.env.AUTH_REFRESH_TOKEN_EXPIRED || "2d"
    }
  },
  service: {
    port: process.env.SERVICE_PORT || 9999,
    endpoint: process.env.SERVICE_ENDPOINT || "/graphql"
  },
  doc: {
    limit: !_.isNaN(limit) ? limit : 20
  }
};
