const _ = require("lodash");
const { GraphQLError } = require("graphql");

module.exports = resolverRules => context => {
  return {
    async AuthorizedOperation(node) {
      // Cannot authorize because of invalid request
      // - resolverRules is not a function
      // - Query name is not defined - Don't allow Anonymous Operation
      if (
        !_.isFunction(resolverRules) ||
        !node.name ||
        node.name.kind !== "Name" ||
        (await resolverRules(node.name.value)) !== true
      ) {
        return context.reportError(new GraphQLError("Forbidden", [node]));
      }
    }
  };
};
