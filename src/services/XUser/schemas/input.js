module.exports = `
  input UserProfile {
    firstName: String
    lastName: String
    avatar: String
  }

  input UserAttributes {
    status: Int!
    profile: UserProfile
  }

  input UserCreate {
    username: String!
    email: String!
    password: String!
    status: Int!
    profile: UserProfile
  }
`;
