"use strict";
exports.__esModule = true;
exports["default"] = "\n  type User {\n    id: ID!\n    username: String!\n    email: String!\n    password: String!\n    status: Int!\n    firstName: String\n    lastName: String\n  }\n\n  type Query {\n    users: [User!]\n  }\n\n  type Mutation {\n    createUser(\n      username: String!\n      email: String!\n      password: String!\n      status: Int!\n      firstName: String\n      lastName: String\n    ): User\n  }\n";
//# sourceMappingURL=schema.js.map