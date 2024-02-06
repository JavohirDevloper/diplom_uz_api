const mongoose = require("mongoose");

const Sub_CategorySchema = new mongoose.Schema(
  {
    sub_cat_name: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Sub_Category name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Sub_Category name should be at least 3 characters long"],
      maxlength: [50, "Sub_Category name should not exceed 50 characters"],
    },
    cat_ref_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category"
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Sub_Category = mongoose.model("Sub_Category", Sub_CategorySchema);
module.exports = Sub_Category;
