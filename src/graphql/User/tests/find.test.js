const faker = require("faker");
const _ = require("lodash");
const bluebird = require("bluebird");

const server = require("./server");
const createUser = require("./_createUser");

describe("Find one user", () => {
  let _id;

  beforeAll(async () => {
    const user = await createUser;
    _id = user._id;
    return user;
  });

  it("should return user with _id", done => {
    server(
      JSON.stringify({
        query: `
        query findUser($_id: String!) {
          user(_id: $_id) {
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
        expect(res.data.user).toBeTruthy();
        expect(res.data.user._id).toBe(_id);
        expect(res.data.user.username).toBeTruthy();
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
