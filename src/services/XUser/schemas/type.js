module.exports = `
  type UserProfile {
    firstName: String
    lastName: String
    avatar: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    status: Int!
    profile: UserProfile,
    createdAt: String!
    updatedAt: String!
  }

  type Account {
    _id: ID!
    username: String!
    email: String!
    status: Int!
    profile: UserProfile
  }
`;
