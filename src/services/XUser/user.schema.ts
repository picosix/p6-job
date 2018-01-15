import * as mongoose from "mongoose";

// Constants
export const STATUS_BLOCKED = -1;
export const STATUS_INACTIVE = 1;
export const STATUS_ACTIVE = 1;
export const TOKEN_TYPE_ACTIVATE = 1;
export const TOKEN_TYPE_RESET_PASSWORD = 2;

// Define Typescript type
export type UserModel = mongoose.Document & {
  email: string;
  username: string;
  password: string;
  status: number;
  source: string;
  token: UserToken;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

export type UserToken = {
  token: string;
  expiredAt: Date;
  type: number;
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
    source: { type: String, required: true },
    token: {
      token: { type: String, required: true, unique: true },
      expiredAt: { type: Date, required: true, default: Date.now() },
      type: {
        type: Number,
        required: true,
        enum: [TOKEN_TYPE_ACTIVATE, TOKEN_TYPE_RESET_PASSWORD]
      }
    },
    profile: {
      firstName: { type: String, max: 255 },
      lastName: { type: String, max: 255 },
      avatar: { type: String }
    }
  },
  { timestamps: true }
);

// Defined model
export default userSchema;
