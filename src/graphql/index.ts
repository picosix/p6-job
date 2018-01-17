import { mergeSchemas } from "graphql-tools";

import userSchema from "./User";
import postSchema from "./Post";

export default mergeSchemas({
  schemas: [userSchema, postSchema]
});
