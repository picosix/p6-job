const User = require("../models/User");

module.exports = {
  async users(obj = {}, args = {}, context = {}, info = {}) {
    return User.find({}).exec();
  },
  async user(obj = {}, { _id = "" }, context = {}, info = {}) {
    return User.findById(_id);
  }
};
