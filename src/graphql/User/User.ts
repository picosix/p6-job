import * as mongoose from "mongoose";
import * as bluebird from "bluebird";

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
  firstName: string;
  lastName: string;
};

// Defined Mongoose schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 5, max: 255 },
    status: {
      type: Number,
      default: STATUS_ACTIVE,
      enum: [STATUS_BLOCKED, STATUS_INACTIVE, STATUS_ACTIVE]
    },
    firstName: { type: String, max: 255 },
    lastName: { type: String, max: 255 }
  },
  { timestamps: true }
);

// Defined model
const User = mongoose.model("User", userSchema);
export default User;
