export default `
  type Post {
    _id: ID!
    userId: String!
    description: String!
  }

  type Query {
    posts: [Post!]
  }

  type Mutation {
    createPost(
      userId: String!
      description: String!
    ): Post
  }
`;
