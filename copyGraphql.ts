const shell = require("shelljs");

shell.rm("-rf", "dist/graphql/*");
shell.cp("-R", "src/graphql", "dist/");
