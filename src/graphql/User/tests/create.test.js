const faker = require("faker");
const server = require("./server");

describe("Create users", () => {
  it("should return array users", done => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      status: 1,
      firstName: faker.name.findName(),
      lastName: faker.name.lastName()
    };
    server(
      JSON.stringify({
        query: `
         mutation createUser($username: String!, $email: String!, $password: String!, $status: Int!, $firstName: String, $lastName: String) {
          createUser(username: $username, email: $email, password: $password, status: $status, firstName: $firstName, lastName: $lastName) {
            _id
            username
            email
          }
        }`,
        variables: user
      })
    )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.data.createUser._id).toBeTruthy();
        expect(res.data.createUser.username).toBe(user.username);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
