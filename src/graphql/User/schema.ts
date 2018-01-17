export default `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    status: Int!
    firstName: String
    lastName: String
  }

  type Query {
    users: [User!]
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      status: Int!
      firstName: String
      lastName: String
    ): User!
  }
`;
