const Joi = require("joi");
const Comment = require("../models/Comment");

const commentSchema = Joi.object({
  user_ref_id: Joi.string().required(),
  file_ref_id: Joi.string().required(),
  text: Joi.string().required(),
});

const getComment = async (req, res) => {
  try {
    const comments = await Comment.find().populate({
      path: "file_ref_id",
      path: "user_ref_id",
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createComment = async (req, res) => {
  try {
    const { text, user_ref_id, file_ref_id } = req.body;
    const validation = commentSchema.validate({
      user_ref_id,
      file_ref_id,
      text,
    });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const newComment = new Comment({ text, user_ref_id, file_ref_id });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCommentById = async (req, res) => {
  try {
    const { text, user_ref_id, file_ref_id } = req.body;
    const validation = commentSchema.validate({
      user_ref_id,
      file_ref_id,
      text,
    });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text, user_ref_id, file_ref_id },
      { new: true }
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getComment,
  createComment,
  updateCommentById,
  deleteCommentById,
};
