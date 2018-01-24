module.exports = `
  type Query {
    users(
      _page: Int = 0,
      _sort: FindSort,
      username: String,
      email: String,
      status: Int,
      createdAt: FindBetween,
      updatedAt: FindBetween  
    ): [User!],
    user(_id: String!): User!
    account(_id: String!): Account!
  }

  type Mutation {
    adminUserAdd(attributes: UserCreateAttributes!): User!
    adminUserUpdate(_id: String!, attributes: UserUpdateAttributes!): User!
    adminUserRemove(_id: String!): User!
    adminRoleAdd(attributes: RoleAttributes!): Role!
    accountRegister(attributes: AccountRegisterAttributes!): Account!
    accountLoginLocal(attributes: AccountLoginLocalAttributes!): AccountToken!
  }
`;
