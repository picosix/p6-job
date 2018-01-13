import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

import { mongoUri } from "./settings";
import User from "./services/XUser/user.model";

// Mongoose config
mongoose.connect(mongoUri, { useMongoClient: true });
/**
 * To fix message "Cannot assign to 'Promise'
 * because it is a constant or a read-only property"
 * Use (<any>mongoose).Promise = bluebird;
 */
(<any>mongoose).Promise = bluebird;

export default mongoose;
