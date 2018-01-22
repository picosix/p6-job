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

/**
 * Find all allowed operation of users
 * then return result of comparation of operationName and allowed operations
 * @param {object} user User information
 * @return {function} synchronous function to decide this action is allowed or not
 */
const auhthorization = async user => {
  // Do all async code here
  const allowedOperations = [];

  // Return a higher-order function
  return operationName => true;
};
module.exports = { authentication, auhthorization };
