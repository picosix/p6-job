const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  return mongoose.connection.db.dropDatabase();
};
