const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Category name is required"],
      unique: true,
      minlength: [3, "Category name should be at least 3 characters long"],
      maxlength: [50, "Category name should not exceed 50 characters"],
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
