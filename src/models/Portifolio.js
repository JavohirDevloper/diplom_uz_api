const mongoose = require("mongoose");

const portifolioSchema = new mongoose.Schema({
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  cat_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
  },
  sub_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Sub_Category",
  },
});

const Portifolio = mongoose.model("Portifolio", portifolioSchema);

module.exports = Portifolio;
