const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  gmail: {
    type: mongoose.SchemaTypes.String,
    trim: true,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: mongoose.SchemaTypes.String, // Corrected data type
    required: true,
  },
  phone_number: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  subscription_status: {
    type: mongoose.SchemaTypes.String,
  },
  post_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Position",
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
