const faker = require("faker");
const _ = require("lodash");
const bluebird = require("bluebird");

const server = require("./server");
const utils = require("./utils");

describe("Update user", () => {
  let _id;

  beforeAll(async () => {
    const user = await utils.createUser;
    _id = user._id;
    return user;
  });

  it("should return user has been updated", async () => {
    const newAttributes = {
      status: 1,
      profile: {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar()
      }
    };
    const res = await server(
      JSON.stringify({
        query: `
         mutation adminUserUpdate($_id: String!, $attributes: UserUpdateAttributes!) {
          user: userUpdate(_id: $_id, attributes: $attributes) {
            _id
            status
            profile {
              firstName
              lastName,
              avatar
            }
          }
        }`,
        variables: {
          _id,
          attributes: newAttributes
        }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.user._id).toBeTruthy();
    expect(res.data.user.status).toBe(newAttributes.status);
    expect(res.data.user.profile).toEqual(newAttributes.profile);
  });
});
