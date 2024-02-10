const Joi = require("joi");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const User = require("../models/User.js");

const registerAndLoginUser = async (req, res) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      username: Joi.string().required(),
      phone_number: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullname, useranem, email, password, phone_number } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullname,
      useranem,
      phone_number,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const registerUser = async (req, res) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      username: Joi.string().required(),
      phone_number: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await registerAndLoginUser(req, res);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const phone_number_tokens_file = path.join(__dirname, "email.json");
let phone_number_tokens = {};

if (fs.existsSync(phone_number_tokens_file)) {
  const data = fs.readFileSync(phone_number_tokens_file, "utf8");
  phone_number_tokens = JSON.parse(data);
}

const userLogin = async (req, res) => {
  const { email } = req.body;
  const users = await User.find({ email });

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const tokenData = {
    code: Math.floor(100000 + Math.random() * 900000).toString(),
    token: resetToken,
  };
  phone_number_tokens[resetToken] = tokenData;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhammadiyevj72@gmail.com",
      pass: "qytkdqxapslcdmya",
    },
  });

  const resetURL = `${encodeURIComponent(tokenData.code)}`;

  const mailOptions = {
    from: email,
    to: email,
    subject: "Tasdiqlash cod",
    text: `Sizning tasdiqlovchi codingiz buni hech kimga bermang: ${resetURL}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while sending the email" });
    } else {
      console.log("Email sent:", info.response);
      fs.writeFileSync(
        phone_number_tokens_file,
        JSON.stringify(phone_number_tokens)
      );
      res.json({ message: "Sizning gmailinga cod bordi" });
    }
  });
};

const resetcode = (req, res) => {
  const { token } = req.params;
  const { code, phone_number } = req.body;

  const tokenData = phone_number_tokens[token];

  if (!tokenData) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }
  if (tokenData.code !== code) {
    return res.status(400).json({ error: "Invalid verification code" });
  }
  const user = users.find((user) => user.id === tokenData.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.phone_number = phone_number;
  delete phone_number_tokens[token];
  fs.writeFileSync(
    phone_number_tokens_file,
    JSON.stringify(phone_number_tokens)
  );
  res.json({ message: "Sizning gmailinga cod bordi" });
};

const getTokenByCode = (req, res) => {
  const { code } = req.params;
  const tokenData = Object.values(phone_number_tokens).find(
    (data) => data.code === code
  );
  if (!tokenData) {
    return res.status(404).json({ error: "Token mavjud emas" });
  }

  const { token } = tokenData;

  res.json({ token });
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, username, phone_number, email, password } = req.body;

    let updateData = {
      fullname,
      username,
      phone_number,
      email,
      password,
    };

    if (req.file) {
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      if (
        user.images !==
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      ) {
        fs.unlinkSync(user.images);
      }

      updateData.images = req.file.path;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    if (
      user.images !==
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      fs.unlinkSync(user.images);
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = {
  userLogin,
  resetcode,
  getTokenByCode,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  registerAndLoginUser,
};
