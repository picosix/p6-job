const faker = require("faker");
const bluebird = require("bluebird");
const _ = require("lodash");

const server = require("./server");
const utils = require("./utils");

describe("Remove one user", () => {
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
        mutation adminUserRemove($_id: String!) {
          userRemove(_id: $_id) {
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
        expect(res.data.userRemove).toBeTruthy();
        expect(res.data.userRemove._id).toBe(_id);
        expect(res.data.userRemove.username).toBeTruthy();
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
