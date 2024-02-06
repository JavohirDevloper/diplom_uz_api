const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      trim: true,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    fullname: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    subscription_status: {
      type: mongoose.SchemaTypes.String,
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["admin", "super_admin"],
      default: "admin",
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
