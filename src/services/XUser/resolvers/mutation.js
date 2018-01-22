const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");

const User = require("../models/User");
const jwtSign = bluebird.promisify(jwt.sign);

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
  },
  async accountLoginLocal(
    obj = {},
    { attributes = {} },
    { _secretKey },
    info = {}
  ) {
    const { username: loginUsername, password: loginPassword } = attributes;
    // Allow login by username and email
    const user = await User.findOne({
      $or: [{ username: loginUsername }, { email: loginUsername }]
    });
    if (!user || !await user.passwordCompare(loginPassword)) {
      throw new Error("Invalid username or password.");
    }

    const { _id, username, email } = user.toObject();
    const accessToken = await jwtSign({ _id, username, email }, _secretKey, {
      expiresIn: "1d"
    });
    const refreshToken = await jwtSign({ _id, username, email }, _secretKey, {
      expiresIn: "2d"
    });

    return { accessToken, refreshToken };
  }
};
