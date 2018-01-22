const server = require("./server");

describe("Find all user", () => {
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
