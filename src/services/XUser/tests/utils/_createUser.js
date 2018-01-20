const faker = require("faker");
const _ = require("lodash");
const bluebird = require("bluebird");

const server = require("../server");

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

module.exports = server(
  JSON.stringify({
    query: `
     mutation addUser($attributes: UserCreate) {
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
).then(res => {
  expect(res.status).toBe(200);
  expect(res.data.user._id).toBeTruthy();
  expect(res.data.user.username).toBe(_.toLower(attributes.username));
  expect(res.data.user.email).toBe(_.toLower(attributes.email));
  expect(res.data.user.profile).toBeTruthy();
  return bluebird.resolve(res.data.user);
});
