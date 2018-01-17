const server = require("./server");

describe("Find all users", () => {
  it("should return array users", done => {
    server(
      JSON.stringify({
        query: `
        query findAllUser {
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
