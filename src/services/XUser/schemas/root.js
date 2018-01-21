module.exports = `
  type Query {
    users: [User!],
    user(_id: String!): User!
    account(_id: String!): Account!
  }

  type Mutation {
    userAdd(attributes: UserCreateAttributes!): User!
    userUpdate(_id: String!, attributes: UserUpdateAttributes!): User!
    userRemove(_id: String!): User!
    accountRegister(attributes: AccountRegisterAttributes!): Account!
  }
`;
