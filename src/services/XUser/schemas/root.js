module.exports = `
  type Query {
    users: [User!],
    user(_id: String): User!
  }

  type Mutation {
    addUser(attributes: UserCreate): User!
    updateUser(_id: String, attributes: UserAttributes): User!
    removeUser(_id: String): User!
  }
`;
