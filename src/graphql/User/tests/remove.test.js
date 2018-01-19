const faker = require("faker");
const bluebird = require("bluebird");
const _ = require("lodash");

const server = require("./server");
const utils = require("./utils");

describe("Find one user", () => {
  let _id;

  beforeAll(async () => {
    const user = await utils.createUser;
    _id = user._id;
    return user;
  });

  it("should return user with _id", done => {
    server(
      JSON.stringify({
        query: `
        mutation removeUser($_id: String!) {
          removeUser(_id: $_id) {
            _id,
            username
          }
        }`,
        variables: {
          _id
        }
      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data.removeUser).toBeTruthy();
        expect(res.data.removeUser._id).toBe(_id);
        expect(res.data.removeUser.username).toBeTruthy();
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
