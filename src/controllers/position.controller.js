const Position = require("../models/Position");
const Joi = require("joi");

const positionSchema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Position name must be a string",
    "string.empty": "Position name is required",
    "string.min": "Position name should be at least {#limit} characters long",
    "string.max": "Position name should not exceed {#limit} characters",
    "any.required": "Position name is required",
  }),
});

const createPosition = async (req, res) => {
  try {
    const { error } = positionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const newPosition = await Position.create(req.body);
    res.status(201).json(newPosition);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" , error: error.message });
  }
};
const getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) {
      return res.status(404).json({ error: "Position not found" });
    }
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
const updatePositionById = async (req, res) => {
  try {
    const { error } = positionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedPosition = await Position.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPosition) {
      return res.status(404).json({ error: "Position not found" });
    }
    res.json(updatedPosition);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deletePositionById = async (req, res) => {
  try {
    const deletedPosition = await Position.findByIdAndDelete(req.params.id);
    if (!deletedPosition) {
      return res.status(404).json({ error: "Position not found" });
    }
    res.json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPositionById,
  createPosition,
  updatePositionById,
  deletePositionById,
};
