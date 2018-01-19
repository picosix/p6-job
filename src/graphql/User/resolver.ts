import { default as User } from "./models/User";

type UserId = {
  _id: String;
};

export default {
  Query: {
    async users(obj = {}, args = {}, context = {}, info = {}) {
      return User.find({}).exec();
    },
    async user(obj = {}, args: UserId, context = {}, info = {}) {
      const { _id } = args;
      return User.findById(_id);
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
