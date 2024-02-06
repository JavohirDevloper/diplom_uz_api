const Joi = require("joi");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register Admin
const registerAndLoginAdmin = async (req, res) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullname, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ fullname, email, password: hashedPassword });
    const savedAdmin = await newAdmin.save();

    const token = jwt.sign({ id: savedAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, Admin: savedAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    await registerAndLoginAdmin(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// login Admin
const loginAdmin = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Foydalanuvchini yaratish
const createAdmin = async (req, res) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Bu email allaqachon ro'yxatdan o'tgan" });
    }

    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Foydalanuvchilarni o'qish
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  idisi bilan oʻqish
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  yangilash
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const schema = Joi.object({
      fullname: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(4),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  o'chirish
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  registerAdmin,
  loginAdmin,
  registerAndLoginAdmin,
};
