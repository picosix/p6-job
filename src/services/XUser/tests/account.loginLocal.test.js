const faker = require("faker");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bluebird = require("bluebird");

const server = require("./server");
const utils = require("./utils");
const jwtVerify = bluebird.promisify(jwt.verify);

describe("Login to account with username and password", () => {
  let user;

  beforeAll(async () => {
    user = await utils.createUser;
    return user;
  });

  it("should return access & refresh token with username + password", async () => {
    const attributes = {
      username: user.username,
      password: "123456"
    };
    const res = await server(
      JSON.stringify({
        query: `
         mutation accountLoginLocal($attributes: AccountLoginLocalAttributes!) {
          token: accountLoginLocal(attributes: $attributes) {
            accessToken
            refreshToken
          }
        }`,
        variables: { attributes }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.token.accessToken).toBeTruthy();
    expect(res.data.token.refreshToken).toBeTruthy();

    const accessPayload = await jwtVerify(
      res.data.token.accessToken,
      process.env.AUTH_SECRET_KEY
    );
    expect(accessPayload._id).toBe(user._id);

    const refreshPayload = await jwtVerify(
      res.data.token.refreshToken,
      process.env.AUTH_SECRET_KEY
    );
    expect(refreshPayload._id).toBe(user._id);
  });
});
