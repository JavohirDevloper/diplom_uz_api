const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["user", "admin", "super_admin"],
      default: "super_admin",
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

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
