import * as mongoose from "mongoose";

export const create = async (email: string, username: string) => ({
  email,
  username
});
