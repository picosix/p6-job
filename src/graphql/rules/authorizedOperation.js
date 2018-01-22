const _ = require("lodash");
const { GraphQLError } = require("graphql");

module.exports = allowedOperate =>
  function authorizedOperation(context) {
    return {
      OperationDefinition: {
        enter(node) {
          // Cannot authorize because of invalid request
          // - allowedOperate is not a function
          // - Query name is not defined - Don't allow Anonymous Operation
          if (
            !_.isFunction(allowedOperate) ||
            !node.name ||
            node.name.kind !== "Name" ||
            allowedOperate(node.name.value) !== true
          ) {
            return context.reportError(new GraphQLError("Forbidden", [node]));
          }
        }
      }
    };
  };
