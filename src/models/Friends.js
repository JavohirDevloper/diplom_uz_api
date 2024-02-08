const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;
