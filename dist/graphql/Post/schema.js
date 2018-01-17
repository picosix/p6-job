"use strict";
exports.__esModule = true;
exports["default"] = "\n  type Post {\n    _id: ID!\n    userId: String!\n    description: String!\n  }\n\n  type Query {\n    posts: [Post!]\n  }\n\n  type Mutation {\n    createPost(\n      userId: String!\n      description: String!\n    ): Post\n  }\n";
//# sourceMappingURL=schema.js.map