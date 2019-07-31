const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
console.log("1");
const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    .then(() => console.log("MongoDB Connect"))
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
  console.log("3");
};
console.log("3");
module.exports = connectDB;
