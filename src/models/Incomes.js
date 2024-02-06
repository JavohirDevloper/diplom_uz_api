const mongoose = require("mongoose");
const incomeSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  file_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "File",
  },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
