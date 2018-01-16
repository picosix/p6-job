const posts = [
  {
    id: "random",
    userId: "random",
    description: "A funny description ..."
  }
];

export default {
  Query: {
    async posts(obj = {}, args = {}, context = {}, info = {}) {
      return posts;
    }
  },
  Mutation: {
    async createPost(obj = {}, args = {}, context = {}, info = {}) {
      return posts[0];
    }
  }
};
