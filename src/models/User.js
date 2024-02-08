const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    fullname: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    phone_number: {
      type: mongoose.SchemaTypes.Number,
      required: true,
      unique: true,
    },
    about: {
      type: [mongoose.SchemaTypes.String],
      required: true,
    },
    specialization: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    images: {
      type: mongoose.SchemaTypes.String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
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
    subscription_status: {
      type: mongoose.SchemaTypes.String,
      enum: ["true", "false"],
      default: "false",
    },
    post_ref_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Position",
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
