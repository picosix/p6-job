export default `
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
    profile: UserProfile
  }

  type Query {
    users: [User!]
  }

  input Profile {
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
      profile: Profile
    ): User!
  }
`;
