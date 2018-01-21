const server = require("./server");

describe("Find all user", () => {
  it("should return array users", done => {
    server(
      JSON.stringify({
        query: `
        query adminUserFindAll {
          users {
            _id
          }
        }`
      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data.users).toBeTruthy();
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
