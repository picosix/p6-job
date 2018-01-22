const _ = require("lodash");

const User = require("../models/User");

module.exports = {
  async users(
    obj = {},
    { username, email, status, createdAt, updatedAt },
    { paging, ordering },
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
    if (_.isObject(createdAt)) {
      _.each(
        createdAt,
        (date, type) =>
          date ? query.where("createdAt")[type](new Date(date)) : ""
      );
    }
    if (_.isObject(updatedAt)) {
      _.each(
        updatedAt,
        (date, type) =>
          date ? query.where("updatedAt")[type](new Date(date)) : ""
      );
    }

    query.skip(paging.offset);
    query.limit(paging.limit);
    if (ordering) {
      query.sort(ordering);
    }

    return query.exec();
  },
  async user(obj = {}, { _id = "" }, context = {}, info = {}) {
    return User.findById(_id);
  },
  async account(obj = {}, { _id = "" }, context = {}, info = {}) {
    return User.findById(_id).select("username email status profile");
  }
};
