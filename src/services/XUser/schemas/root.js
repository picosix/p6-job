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
    roles(
      _page: Int = 0,
      _sort: FindSort,
      name: String,
      status: Int,
      createdAt: FindBetween,
      updatedAt: FindBetween  
    ): [Role!]
    role(_id: String): Role!
  }

  type Mutation {
    adminUserAdd(attributes: UserCreateAttributes!): User!
    adminUserUpdate(_id: String!, attributes: UserUpdateAttributes!): User!
    adminUserRemove(_id: String!): User!
    accountRegister(attributes: AccountRegisterAttributes!): Account!
    accountLoginLocal(attributes: AccountLoginLocalAttributes!): AccountToken!
    adminRoleAdd(attributes: RoleAttributes!): Role!
    adminRoleUpdate(_id: String!, attributes: RoleAttributes!): Role!
    adminRoleRemove(_id: String!): Role!
  }
`;
