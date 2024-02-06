// superAdminController.js
const SuperAdmin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SuperAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.status(404).json({ message: "Super admin not found" });
    }
    const passwordMatch = await bcrypt.compare(password, superAdmin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: superAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); 
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const createAdmin = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new SuperAdmin({ fullname, email, password: hashedPassword });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getAllAdmins = async (req, res) => {
  try {
    const admins = await SuperAdmin.find();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  idisi bilan oʻqish
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await SuperAdmin.findById(id);
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

    const updatedAdmin = await SuperAdmin.findByIdAndUpdate(id, req.body, {
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
    await SuperAdmin.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  SuperAdminLogin,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getAdminById,
};
