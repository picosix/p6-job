const User = require("./models/User");

module.exports = {
  Query: {
    async users(obj = {}, args = {}, context = {}, info = {}) {
      return User.find({}).exec();
    },
    async user(obj = {}, { _id = "" }, context = {}, info = {}) {
      return User.findById(_id);
    }
  },
  Mutation: {
    async addUser(obj = {}, { attributes = {} }, context = {}, info = {}) {
      const user = await User.create(attributes);
      return user.toObject();
    },
    async updateUser(
      obj = {},
      { _id = "", attributes = {} },
      context = {},
      info = {}
    ) {
      // Result of mongoose.findByIdAndUpdate is the document BEFORE updated
      const user = await User.findByIdAndUpdate(_id, attributes);
      const updatedUser = await User.findById(user._id);
      return updatedUser.toObject();
    },
    async removeUser(obj = {}, { _id = "" }, context = {}, info = {}) {
      // Result of mongoose.findByIdAndRemove is the document BEFORE deleted
      const user = await User.findByIdAndRemove(_id);
      return user.toObject();
    }
  }
};
