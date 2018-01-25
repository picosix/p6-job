const faker = require("faker");
const _ = require("lodash");
const bluebird = require("bluebird");

const server = require("./server");
const utils = require("./utils");

describe("Update role", () => {
  let role;

  beforeAll(async () => {
    await utils.clearDb();
    role = await utils.createRole();
  });

  it("should return data of updated role", async () => {
    const newAttributes = {
      name: faker.lorem.word(),
      status: 0,
      permissions: ["adminUserAdd", "adminUserUpdate"]
    };
    const res = await server(
      JSON.stringify({
        query: `
         mutation adminRoleUpdate($_id: String!, $attributes: RoleAttributes!) {
          role: adminRoleUpdate(_id: $_id, attributes: $attributes) {
            _id
            name
            status
            permissions
          }
        }`,
        variables: {
          _id: role._id,
          attributes: newAttributes
        }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.role._id).toBeTruthy();
    expect(res.data.role.name).toBe(newAttributes.name);
    expect(res.data.role.status).toBe(newAttributes.status);
    expect(res.data.role.permissions).toEqual(newAttributes.permissions);
  });
});
