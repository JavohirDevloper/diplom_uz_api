const Joi = require("joi");
const SubCategory = require("../models/Sub_Category");

const subCategoryValidationSchema = Joi.object({
  sub_cat_name: Joi.string().trim().min(3).max(50).required().messages({
    "string.base": "Sub_Category name should be a string",
    "string.empty": "Sub_Category name is required",
    "string.min":
      "Sub_Category name should be at least {#limit} characters long",
    "string.max": "Sub_Category name should not exceed {#limit} characters",
    "any.required": "Sub_Category name is required",
  }),
  cat_ref_id: Joi.string().trim().required().messages({
    "string.base": "Category reference ID should be a string",
    "string.empty": "Category reference ID is required",
    "any.required": "Category reference ID is required",
  }),
});

const createSubCategory = async (req, res) => {
  try {
    const { error } = subCategoryValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const subCategory = new SubCategory(req.body);
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("cat_ref_id");
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const subCategory = await SubCategory.findById(subCategoryId).populate(
      "cat_ref_id"
    );
    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { error } = subCategoryValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const subCategoryId = req.params.id;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      req.body,
      { new: true }
    );
    if (!updatedSubCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const deletedSubCategory = await SubCategory.findByIdAndDelete(subCategoryId);
    if (!deletedSubCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }
    res.json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
