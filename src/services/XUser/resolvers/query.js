const _ = require("lodash");

const User = require("../models/User");

module.exports = {
  async users(
    obj = {},
    { username, email, status, createdAt, updatedAt },
    { _doc },
    info = {}
  ) {
    const query = User.find({});
    // Query username and email with case insensitive
    if (username) {
      query.where("username", new RegExp(username));
    }
    if (email) {
      query.where("email", new RegExp(email));
    }
    if (status) {
      query.where("status", status);
    }
    if (createdAt) {
      query.where("createdAt").gte(new Date(createdAt));
    }
    if (updatedAt) {
      query.where("updatedAt").gte(new Date(updatedAt));
    }

    query.skip(_doc.offset);
    query.limit(_doc.limit);
    query.sort("createdAt");

    return query.exec();
  },
  async user(obj = {}, { _id = "" }, context = {}, info = {}) {
    return User.findById(_id);
  },
  async account(obj = {}, { _id = "" }, context = {}, info = {}) {
    return User.findById(_id).select("username email status profile");
  }
};
