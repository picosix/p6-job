module.exports = `
  input UserProfileAttributes {
    firstName: String
    lastName: String
    avatar: String
  }

  input UserUpdateAttributes {
    status: Int!
    profile: UserProfileAttributes
  }

  input UserCreateAttributes {
    username: String!
    email: String!
    password: String!
    status: Int!
    profile: UserProfileAttributes
  }

  input AccountRegisterAttributes {
    username: String!
    email: String!
    password: String!
    profile: UserProfileAttributes
  }

  input AccountLoginLocalAttributes {
    username: String
    password: String!
  }
`;
