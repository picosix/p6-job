module.exports = {
  debug: process.env.NODE_ENV !== "production",
  mongoUri: process.env.MONGO_URI || "",
  port: process.env.API_PORT || 9999,
  endpoint: process.env.API_ENDPOINT || "/graphql"
};
