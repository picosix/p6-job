import { default as User } from "./User";

const users = [
  {
    id: "random",
    username: "picosix",
    email: "picosix.com@gmail.com",
    password: "12345",
    status: 1,
    firstName: "Tuan",
    lastName: "Nguyen"
  }
];

export default {
  Query: {
    async users(obj = {}, args = {}, context = {}, info = {}) {
      return User.find({}).exec();
    }
  },
  Mutation: {
    async createUser(
      obj = {},
      {
        username = "",
        email = "",
        password = "",
        status = "",
        firstName = "",
        lastName = ""
      },
      context = {},
      info = {}
    ) {
      return User.create({
        username,
        email,
        password,
        status,
        firstName,
        lastName
      }).then(user => user.toObject());
    }
  }
};
