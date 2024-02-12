const Joi = require("joi");
const Order = require("../models/Order");

const orderSchema = Joi.object({
  order_name: Joi.string().required(),
  salary: Joi.string().required(),
  deadline: Joi.string().required(),
  user_ref_id: Joi.string().required(),
  cat_ref_id: Joi.string().required(),
  sub_ref_id: Joi.string().required(),
});

const createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details[0].message });
    }

    const order = new Order(req.body);
    await order.save();
    res.status(201).json({data: order });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate([
      { path: "user_ref_id" },
      { path: "cat_ref_id" },
      { path: "sub_ref_id" },
    ]);
    res.status(200).json({data: orders });
  } catch (error) {
    res.status(400).json({error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate([
      { path: "user_ref_id" },
      { path: "cat_ref_id" },
      { path: "sub_ref_id" },
    ]);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({data: order });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details[0].message });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({data: order });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.body);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({message: "Order deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrderById,
  deleteOrder,
};
