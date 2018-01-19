export default `
  type Profile {
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
    profile: Profile
  }

  type Query {
    users: [User!],
    user(_id: String): User!
  }

  input UserProfile {
    firstName: String
    lastName: String
    avatar: String
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      status: Int!
      profile: UserProfile
    ): User!
  }
`;
