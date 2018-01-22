const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");
const _ = require("lodash");
const { GraphQLError } = require("graphql");

const jwtVerify = bluebird.promisify(jwt.verify);

const authentication = secretKey => {
  return (req, res, next) => {
    if (!req.headers || !req.headers.authorization) return next();

    const parts = req.headers.authorization.split(" ");

    // Invalid token format
    if (parts[0] !== "Bearer" || !parts[1]) {
      return next(new Error("Format is Authorization: Bearer [token]"));
    }

    jwtVerify(parts[1], secretKey)
      .then(user => {
        req._user = user;
        return next();
      })
      .catch(next);
  };
};

const authorize = resolverRules => context => {
  return {
    async OperationAuthorization(node) {
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

module.exports = { authentication, authorize };
