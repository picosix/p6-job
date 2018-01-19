import { default as User, Profile } from "./models/User";

type GetUserInput = {
  _id: String;
};
type UpdateUserInput = {
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
    async user(obj = {}, args: GetUserInput, context = {}, info = {}) {
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
    async updateUser(obj = {}, args: UpdateUserInput, context = {}, info = {}) {
      const { _id, attributes } = args;
      // Result of mongoose.findByIdAndUpdate is the document BEFORE updated
      const user = await User.findByIdAndUpdate(_id, attributes);
      const updatedUser = await User.findById(user._id);
      return updatedUser.toObject();
    }
  }
};
