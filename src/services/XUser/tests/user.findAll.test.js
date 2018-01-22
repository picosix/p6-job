const server = require("./server");
const utils = require("./utils");

describe("Find all user", () => {
  beforeAll(async () => {
    await utils.clearDb();
  });

  it("should return array users", async () => {
    const res = await server(
      JSON.stringify({
        query: `
        query adminUserFindAll {
          users {
            _id
          }
        }`
      })
    );

    expect(res.status).toBe(200);
    expect(res.data.users).toBeTruthy();
  });
});
