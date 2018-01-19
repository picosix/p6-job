import { default as User, Profile } from "./models/User";

type ArgsId = {
  _id: String;
};
type ArgsAttributes = {
  _id: string;
  attributes: {
    status: number;
    profile: Profile;
  };
};

export default {
  Query: {
    async users(obj = {}, args = {}, context = {}, info = {}) {
      return User.find({}).exec();
    },
    async user(obj = {}, args: ArgsId, context = {}, info = {}) {
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
      const user = await User.create({
        username,
        email,
        password,
        status,
        profile
      });
      return user.toObject();
    },
    async updateUser(obj = {}, args: ArgsAttributes, context = {}, info = {}) {
      const { _id, attributes } = args;
      // Result of mongoose.findByIdAndUpdate is the document BEFORE updated
      const user = await User.findByIdAndUpdate(_id, attributes);
      const updatedUser = await User.findById(user._id);
      return updatedUser.toObject();
    },
    async removeUser(obj = {}, args: ArgsId, context = {}, info = {}) {
      const { _id } = args;
      // Result of mongoose.findByIdAndRemove is the document BEFORE deleted
      const user = await User.findByIdAndRemove(_id);
      return user.toObject();
    }
  }
};
