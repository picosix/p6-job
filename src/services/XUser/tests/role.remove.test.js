const faker = require("faker");
const bluebird = require("bluebird");
const _ = require("lodash");

const server = require("./server");
const utils = require("./utils");

describe("Remove one role", () => {
  let role;

  beforeAll(async () => {
    await utils.clearDb();
    role = await utils.createRole();
  });

  it("should return _id of removed role", async () => {
    const res = await server(
      JSON.stringify({
        query: `
        mutation adminRoleRemove($_id: String!) {
          role: adminRoleRemove(_id: $_id) {
            _id,
            name
          }
        }`,
        variables: {
          _id: role._id
        }
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.role).toBeTruthy();
    expect(res.data.role._id).toBe(role._id);
    expect(res.data.role.name).toBe(role.name);
  });
});
