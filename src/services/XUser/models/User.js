const mongoose = require("mongoose");
const bluebird = require("bluebird");
const _ = require("lodash");
const bcrypt = require("bcrypt");

mongoose.Promise = bluebird;

// Constants
const STATUS_BLOCKED = -1;
const STATUS_INACTIVE = 1;
const STATUS_ACTIVE = 1;

const userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 5, max: 255 },
    status: {
      type: Number,
      default: STATUS_ACTIVE,
      enum: [STATUS_BLOCKED, STATUS_INACTIVE, STATUS_ACTIVE]
    },
    profile: {
      firstName: { type: String, max: 255 },
      lastName: { type: String, max: 255 },
      avatar: String
    }
  },
  { timestamps: true }
);

// DON'T use arrow function,
// because of the this context will be not link to model instance
userSchema.pre("save", function preSave(next) {
  // Both username and email must be in lowercase
  if (this.isModified("username")) {
    this.username = _.toLower(this.username);
  }
  if (this.isModified("email")) {
    this.email = _.toLower(this.email);
  }

  if (!this.isModified("password")) {
    return next();
  }

  // Hash password if it is changed
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(next);
});

const User = mongoose.model("User", userSchema);

exports = module.exports = User;
exports = { STATUS_INACTIVE, STATUS_ACTIVE, STATUS_BLOCKED };
