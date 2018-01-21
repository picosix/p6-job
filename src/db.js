const mongoose = require("mongoose");
const bluebird = require("bluebird");

const { db } = require("./settings");

// Mongoose config
mongoose
  .connect(db.uri)
  .then(() => {})
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  });
mongoose.Promise = bluebird;

module.exports = mongoose;
