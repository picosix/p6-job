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
  Query: { users: async () => users }
};
