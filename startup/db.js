const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
module.exports = async function () {
  try {
    await mongoose.connect("mongodb+srv://gayratjon2003:@Super2003@cluster0.uwrruyk.mongodb.net/task4", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    winston.debug("mongoDb connected..");
  } catch (error) {
    winston.error("Error: ", error);
  }
};


