module.exports = `
  input UserProfileAttributes {
    firstName: String
    lastName: String
    avatar: String
  }

  input RolePermission {
    name: String!
    actions: [String!]
  }

  input RoleAttributes {
    name: String!
    permissions: [RolePermission!]
  }

  input UserUpdateAttributes {
    status: Int!
    profile: UserProfileAttributes
    role: String
  }

  input UserCreateAttributes {
    username: String!
    email: String!
    password: String!
    status: Int!
    profile: UserProfileAttributes
    role: String
  }

  input AccountRegisterAttributes {
    username: String!
    email: String!
    password: String!
  }

  input AccountLoginLocalAttributes {
    username: String
    password: String!
  }
`;
