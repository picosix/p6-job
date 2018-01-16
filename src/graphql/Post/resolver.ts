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
      return users;
    }
  },
  Mutation: {
    async createUser(obj = {}, args = {}, context = {}, info = {}) {
      return users[0];
    }
  }
};
