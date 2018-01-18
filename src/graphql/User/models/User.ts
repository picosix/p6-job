import * as mongoose from "mongoose";
import * as bluebird from "bluebird";
import * as _ from "lodash";
import * as bcrypt from "bcrypt";

(<any>mongoose).Promise = bluebird;

// Constants
export const STATUS_BLOCKED = -1;
export const STATUS_INACTIVE = 1;
export const STATUS_ACTIVE = 1;
export const TOKEN_TYPE_ACTIVATE = 1;
export const TOKEN_TYPE_RESET_PASSWORD = 2;

// Define Typescript type
export type UserModel = mongoose.Document & {
  username: string;
  email: string;
  password: string;
  status: number;
  profile: Profile;
};

export type Profile = {
  firstName: string;
  lastName: string;
  avatar: string;
};

// Defined Mongoose schema
const userSchema = new mongoose.Schema(
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
    .then((hash: String) => {
      this.password = hash;
      return next();
    })
    .catch(next);
});

// Defined model
const User = mongoose.model("User", userSchema);
export default User;
