const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  salary: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  deadline: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  user_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cat_ref_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  sub_ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sub_Category",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
