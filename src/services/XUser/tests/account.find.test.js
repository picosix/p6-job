const faker = require("faker");
const _ = require("lodash");
const bluebird = require("bluebird");

const server = require("./server");
const utils = require("./utils");

describe("Find account infomation", () => {
  let _id;

  beforeAll(async () => {
    const user = await utils.createUser;
    _id = user._id;
    return user;
  });

  it("should return account with _id", async () => {
    const res = await server(
      JSON.stringify({
        query: `
        query accountFind($_id: String!) {
          account(_id: $_id) {
            _id,
            username
          }
        }`,
        variables: {
          _id
        }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.account).toBeTruthy();
    expect(res.data.account._id).toBe(_id);
    expect(res.data.account.username).toBeTruthy();
  });

  it("should throw error if client request password", async () => {
    const res = await server(
      JSON.stringify({
        query: `
        query accountFind($_id: String!) {
          account(_id: $_id) {
            _id,
            password
          }
        }`,
        variables: {
          _id
        }
      })
    );

    expect(res.status).toBe(400);
    expect(res.data).toBeFalsy();
    expect(res.errors).toBeTruthy();
    expect(res.errors[0].message).toEqual(expect.stringContaining("password"));
  });
});
