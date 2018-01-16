import { mergeSchemas } from "graphql-tools";

import userSchema from "./User";
import postSchema from "./User";

export default mergeSchemas({
  schemas: [userSchema, postSchema]
});
