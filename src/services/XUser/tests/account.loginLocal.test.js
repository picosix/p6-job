const faker = require("faker");
const _ = require("lodash");

const server = require("./server");
const utils = require("./utils");

describe("Login to account with username and password", () => {
  let user;

  beforeAll(async () => {
    user = await utils.createUser;
    return user;
  });

  it("should return access & refresh token with username + password", done => {
    const attributes = {
      username: user.username,
      password: "123456"
    };
    server(
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
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data.token.accessToken).toBeTruthy();
        expect(res.data.token.refreshToken).toBeTruthy();
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
