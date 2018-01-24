const faker = require("faker");
const _ = require("lodash");

const server = require("./server");
const utils = require("./utils");

describe("Add a role", () => {
  beforeAll(async () => {
    await utils.clearDb();
  });

  it("should return user - what has been created", async () => {
    const attributes = {
      name: faker.lorem.word(),
      permissions: ["adminUserAdd", "adminUserUpdate", "adminUserRemove"]
    };
    const res = await server(
      JSON.stringify({
        query: `
         mutation adminRoleAdd($attributes: RoleAttributes!) {
          role: adminRoleAdd(attributes: $attributes) {
            _id
            name
            permissions
          }
        }`,
        variables: { attributes }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.role._id).toBeTruthy();
    expect(res.data.role.name).toBe(_.toLower(attributes.name));
    expect(res.data.role.permissions).toEqual(attributes.permissions);
  });
});
