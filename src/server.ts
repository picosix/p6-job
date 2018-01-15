import * as errorHandler from "errorhandler";

import { debug } from "./settings";
import app from "./app";
import db from "./db";

/**
 * Error Handler. Provides full stack
 * Remove fro production
 */
if (debug) {
  app.use(errorHandler());
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
