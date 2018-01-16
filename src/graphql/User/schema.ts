export default `
  type Post {
    id: ID!
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
