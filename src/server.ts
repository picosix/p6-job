import * as errorHandler from "errorhandler";

import { debug } from "./settings";
import app from "./app";

/**
 * Error Handler. Provides full stack
 * Remove fro production
 */
if (debug) {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(
  app.get("port"),
  debug
    ? console.log.bind(
        null,
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      )
    : null
);

export = server;
