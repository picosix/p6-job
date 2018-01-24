const faker = require("faker");
const bluebird = require("bluebird");
const _ = require("lodash");

const server = require("./server");
const utils = require("./utils");

describe("Remove one user", () => {
  let user;

  beforeAll(async () => {
    await utils.clearDb();
    user = await utils.createUser();
  });

  it("should return user with _id", async () => {
    const res = await server(
      JSON.stringify({
        query: `
        mutation adminUserRemove($_id: String!) {
          user: adminUserRemove(_id: $_id) {
            _id,
            username
          }
        }`,
        variables: {
          _id: user._id
        }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.user).toBeTruthy();
    expect(res.data.user._id).toBe(user._id);
    expect(res.data.user.username).toBeTruthy();
  });
});
