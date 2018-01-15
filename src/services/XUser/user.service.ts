import db from "../../db";

const UserModel = db.model("User");
console.log(UserModel);

export const create = async (
  email: string,
  username: string,
  status: number,
  source: string,
  password: string
) => UserModel.create({ email, username, status, source, password });
