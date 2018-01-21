const User = require("../models/User");

module.exports = {
  async userAdd(obj = {}, { attributes = {} }, context = {}, info = {}) {
    const user = await User.create(attributes);
    return user.toObject();
  },
  async userUpdate(
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
  async userRemove(obj = {}, { _id = "" }, context = {}, info = {}) {
    // Result of mongoose.findByIdAndRemove is the document BEFORE deleted
    const user = await User.findByIdAndRemove(_id);
    return user.toObject();
  },
  async accountRegister(
    obj = {},
    { attributes = {} },
    context = {},
    info = {}
  ) {
    const user = await User.create(attributes);
    return user.toObject();
  }
};
