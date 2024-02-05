const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Databazaga ulandik :)");
    })
    .catch(() => {
      console.log("Databazada xatolik :(");
    });
};

module.exports = db;
