const Joi = require("joi");
const Portifolio = require("../models/Portifolio");

const portifolioSchema = Joi.object({
  user_ref_id: Joi.string().required(),
  cat_ref_id: Joi.string().required(),
  sub_ref_id: Joi.string().required(),
});

const getPortifolios = async (req, res) => {
  try {
    const portfolios = await Portifolio.find().populate({
      path: "user_ref_id",
      path: "cat_ref_id",
      path: "sub_ref_id",
    });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPortifolio = async (req, res) => {
  try {
    const { user_ref_id, cat_ref_id, sub_ref_id } = req.body;

    const validation = portifolioSchema.validate({
      user_ref_id,
      cat_ref_id,
      sub_ref_id,
    });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const newPortfolio = new Portifolio({
      user_ref_id,
      cat_ref_id,
      sub_ref_id,
    });
    const savedPortfolio = await newPortfolio.save();
    res.json(savedPortfolio);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePortifolio = async (req, res) => {
  try {
    const { user_ref_id, cat_ref_id, sub_ref_id } = req.body;

    const validation = portifolioSchema.validate({
      user_ref_id,
      cat_ref_id,
      sub_ref_id,
    });
    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    const updatedPortfolio = await Portifolio.findByIdAndUpdate(
      req.params.id,
      { user_ref_id, cat_ref_id, sub_ref_id },
      { new: true }
    );
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePortifolio = async (req, res) => {
  try {
    await Portifolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPortifolio,
  getPortifolios,
  updatePortifolio,
  deletePortifolio,
};
