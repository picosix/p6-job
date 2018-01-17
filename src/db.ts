import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

import { mongoUri } from "./settings";
import { mongo } from "mongoose";

// Mongoose config
mongoose
  .connect(mongoUri, { useMongoClient: true })
  .then(() => {})
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  });
/**
 * To fix message "Cannot assign to 'Promise'
 * because it is a constant or a read-only property"
 * Use (<any>mongoose).Promise = bluebird;
 */
(<any>mongoose).Promise = bluebird;

export default mongoose;
