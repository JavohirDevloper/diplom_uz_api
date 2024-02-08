const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  text: {
    type: [mongoose.SchemaTypes.String],
    required: true,
  },
});

const Reviews = mongoose.model("Review", reviewsSchema);

module.exports = Reviews;
