module.exports = `
  type Query {
    users: [User!],
    user(_id: String): User!
  }

  type Mutation {
    addUser(attributes: UserCreateAttributes): User!
    updateUser(_id: String, attributes: UserUpdateAttributes): User!
    removeUser(_id: String): User!
  }
`;
