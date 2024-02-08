const Joi = require("joi");
const Reviews = require("../models/Reviews");

const reviewsSchema = Joi.object({
  user_ref_id: Joi.string().required(),
  text: Joi.array().items(Joi.string()).required(),
});

const getReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find().populate({
      path: "user_ref_id",
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id).populate({
      path: "user_ref_id",
    });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const createReviews = async (req, res) => {
  try {
    const { user_ref_id, text } = req.body;

    const validation = reviewsSchema.validate({ user_ref_id, text });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const newReview = new Reviews({ user_ref_id, text });
    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateReviewById = async (req, res) => {
  try {
    const { user_ref_id, text } = req.body;

    const validation = reviewsSchema.validate({ user_ref_id, text });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const updatedReview = await Reviews.findByIdAndUpdate(
      req.params.id,
      { user_ref_id, text },
      { new: true }
    );
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReviewsById = async (req, res) => {
  try {
    await Reviews.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  createReviews,
  updateReviewById,
  deleteReviewsById,
};
