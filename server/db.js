const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://user123:user123@cluster0.jo6bbb5.mongodb.net/pizza"
);

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connected successfully");
});

db.on("error", () => {
  console.log("Database connection error ");
});

module.exports = mongoose;
