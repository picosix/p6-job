const faker = require("faker");
const _ = require("lodash");
const bluebird = require("bluebird");

const server = require("../server");

const attributes = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: "123456",
  status: 0,
  profile: {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    avatar: faker.image.avatar()
  }
};

module.exports = async () => {
  const res = await server(
    JSON.stringify({
      query: `
       mutation adminUserAdd($attributes: UserCreateAttributes!) {
        user: adminUserAdd(attributes: $attributes) {
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
  );

  expect(res.status).toBe(200);
  expect(res.data.user._id).toBeTruthy();
  expect(res.data.user.username).toBe(_.toLower(attributes.username));
  expect(res.data.user.email).toBe(_.toLower(attributes.email));
  expect(res.data.user.profile).toBeTruthy();
  return bluebird.resolve(res.data.user);
};
