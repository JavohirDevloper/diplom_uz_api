const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Position name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Position name should be at least 3 characters long"],
      maxlength: [50, "Position name should not exceed 50 characters"],
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

const Position = mongoose.model("Position", PositionSchema);
module.exports = Position;
