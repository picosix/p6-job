const users = [
  {
    id: "random",
    username: "picosix",
    email: "picosix.com@gmail.com",
    status: 1,
    firstName: "Tuan",
    lastName: "Nguyen"
  }
];

export default {
  Query: {
    async users() {
      return users;
    }
  },
  Mutation: {
    async createUser(
      obj = {},
      { email = "", username = "" },
      context = {},
      info = {}
    ) {
      return { email, username };
    }
  }
};
