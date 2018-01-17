import { default as User } from "./models/User";

export default {
  Query: {
    async users(obj = {}, args = {}, context = {}, info = {}) {
      return User.find({}).exec();
    }
  },
  Mutation: {
    async addUser(
      obj = {},
      { username = "", email = "", password = "", status = "", profile = {} },
      context = {},
      info = {}
    ) {
      return User.create({
        username,
        email,
        password,
        status,
        profile
      }).then(user => user.toObject());
    }
  }
};
