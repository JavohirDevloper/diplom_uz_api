const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  file_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "File",
  },
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const View = mongoose.model("View", viewSchema);

module.exports = {
  View,
};
