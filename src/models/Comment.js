const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  file_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "File",
  },
  text: {
    type: [mongoose.SchemaTypes.String],
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
