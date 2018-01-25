const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");

const User = require("../models/User");
const Role = require("../models/Role");

const jwtSign = bluebird.promisify(jwt.sign);
const jwtVerify = bluebird.promisify(jwt.verify);

module.exports = {
  async adminUserAdd(obj = {}, { attributes = {} }, context = {}, info = {}) {
    const user = await User.create(attributes);
    return user.toObject();
  },
  async adminUserUpdate(
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
  async adminUserRemove(obj = {}, { _id = "" }, context = {}, info = {}) {
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
    { settings = {} },
    info = {}
  ) {
    const { secretKey, expiresIn } = settings.auth;
    const { username: loginUsername, password: loginPassword } = attributes;
    // Allow login by username and email
    const user = await User.findOne({
      $or: [{ username: loginUsername }, { email: loginUsername }]
    });
    if (!user || !await user.passwordCompare(loginPassword)) {
      throw new Error("Invalid username or password.");
    }

    const { _id, username, email } = user.toObject();
    const accessToken = await jwtSign({ _id, username, email }, secretKey, {
      expiresIn: expiresIn.accessToken
    });

    const refreshToken = await jwtSign({ _id, username, email }, secretKey, {
      expiresIn: expiresIn.refreshToken
    });

    return { accessToken, refreshToken };
  },
  async adminRoleAdd(obj = {}, { attributes = {} }, context = {}, info = {}) {
    const role = await Role.create(attributes);
    return role.toObject();
  },
  async adminRoleUpdate(
    obj = {},
    { _id = "", attributes = {} },
    context = {},
    info = {}
  ) {
    // Result of mongoose.findByIdAndUpdate is the document BEFORE updated
    const role = await Role.findByIdAndUpdate(_id, attributes);
    const updatedRole = await Role.findById(role._id);
    return updatedRole.toObject();
  },
  async adminRoleRemove(obj = {}, { _id = "" }, context = {}, info = {}) {
    // Result of mongoose.findByIdAndRemove is the document BEFORE deleted
    const role = await Role.findByIdAndRemove(_id);
    return role.toObject();
  }
};
