const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  file_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  file: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  size_file: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  page: {
    type: mongoose.SchemaTypes.Number,
    required: true,
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
  sub_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Sub_Category",
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
