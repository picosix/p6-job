const faker = require("faker");
const _ = require("lodash");
const server = require("./server");

describe("Create user", () => {
  it("should return user has been created", done => {
    const attributes = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      status: 0,
      profile: {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar()
      }
    };
    server(
      JSON.stringify({
        query: `
         mutation addUser($attributes: UserCreateAttributes) {
          user: addUser(attributes: $attributes) {
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
        variables: { attributes }
      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data.user._id).toBeTruthy();
        expect(res.data.user.username).toBe(_.toLower(attributes.username));
        expect(res.data.user.email).toBe(_.toLower(attributes.email));
        expect(res.data.user.profile).toBeTruthy();
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
