const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  file: {
    type: mongoose.SchemaTypes.String,
  },
  size_file: {
    type: mongoose.SchemaTypes.Number,
    // required: true,
  },
  hashtag: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  type_file: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  stars: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
