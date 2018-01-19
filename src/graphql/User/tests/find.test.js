const faker = require("faker");
const _ = require("lodash");
const bluebird = require("bluebird");
const server = require("./server");

describe("Find one user", () => {
  let _id = "5a60b2c4b8146402b23388bb";

  beforeAll(() => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      status: 1,
      profile: {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar()
      }
    };

    return server(
      JSON.stringify({
        query: `
         mutation addUser($username: String!, $email: String!, $password: String!, $status: Int!, $profile: UserProfile) {
          user: addUser(username: $username, email: $email, password: $password, status: $status, profile: $profile) {
            _id
            username
            email
            password
            status
            profile {
              firstName
              lastName
            }
          }
        }`,
        variables: user
      })
    ).then(res => {
      expect(res.status).toBe(200);
      expect(res.data.user._id).toBeTruthy();
      expect(res.data.user.username).toBe(_.toLower(user.username));
      expect(res.data.user.email).toBe(_.toLower(user.email));
      expect(res.data.user.profile).toBeTruthy();
      _id = res.data.user._id;
      return bluebird.resolve(res.data.user);
    });
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
