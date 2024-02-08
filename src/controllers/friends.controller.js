const Joi = require("joi");
const Friend = require("../models/Friends");

const friendSchema = Joi.object({
  user_ref_id: Joi.string().required(),
});

const getAllFriend = async (req, res) => {
  try {
    const friends = await Friend.find().populate("user_ref_id");
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFriendById = async (req, res) => {
  try {
    const friend = await Friend.findById(req.params.id).populate("user_ref_id");
    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }
    res.json(friend);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createFriend = async (req, res) => {
  try {
    const { user_ref_id } = req.body;

    const validation = friendSchema.validate({ user_ref_id });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const newFriend = new Friend({ user_ref_id });
    const savedFriend = await newFriend.save();
    res.json(savedFriend);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatedFriend = async (req, res) => {
  try {
    const { user_ref_id } = req.body;

    const validation = friendSchema.validate({ user_ref_id });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const updatedFriend = await Friend.findByIdAndUpdate(
      req.params.id,
      { user_ref_id },
      { new: true }
    );
    res.json(updatedFriend);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteFreind = async (req, res) => {
  try {
    await Friend.findByIdAndDelete(req.params.id);
    res.json({ message: "Friend deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllFriend,
  getFriendById,
  createFriend,
  updatedFriend,
  deleteFreind,
};
