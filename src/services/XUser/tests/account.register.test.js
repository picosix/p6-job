const faker = require("faker");
const _ = require("lodash");

const server = require("./server");
const utils = require("./utils");

describe("Register new account", () => {
  beforeAll(async () => {
    await utils.clearDb();
  });

  it("should return account has been created", async () => {
    const attributes = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      profile: {
        firstName: faker.name.findName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar()
      }
    };
    const res = await server(
      JSON.stringify({
        query: `
         mutation accountRegister($attributes: AccountRegisterAttributes!) {
          account: accountRegister(attributes: $attributes) {
            _id
            username
            email
            profile {
              firstName
              lastName
              avatar
            }
          }
        }`,
        variables: { attributes }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.account._id).toBeTruthy();
    expect(res.data.account.username).toBe(_.toLower(attributes.username));
    expect(res.data.account.email).toBe(_.toLower(attributes.email));
    expect(res.data.account.profile).toBeTruthy();
  });
});
