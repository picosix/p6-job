const errorHandler = require("errorhandler");
const morgan = require("morgan");

const { debug } = require("../src/settings");
const app = require("../src/app");
const db = require("../src/db");

/**
 * Error Handler. Provides full stack. Remove fro production
 * HTTP request logger middleware
 */
if (debug) {
  app.use(errorHandler());
  app.use(morgan("dev"));
}

/**
 * Start Express server.
 * Make sure mongoose is ready
 */
db.connection.on("open", () =>
  app.listen(
    app.get("port"),
    debug
      ? console.log.bind(
          undefined,
          "App is running at http://localhost:%d in %s mode",
          app.get("port"),
          app.get("env")
        )
      : undefined
  )
);
db.connection.on("error", console.log);
