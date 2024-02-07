const Joi = require("joi");
const Income = require("../models/Incomes");

// Joi validatsiya skemasi
const incomeValidationSchema = Joi.object({
  user_ref_id: Joi.string().required(),
  file_ref_id: Joi.string().required(),
});

// Income yaratish
const createIncome = async (req, res) => {
  try {
    const { error } = incomeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const income = new Income(req.body);
    await income.save();

    res
      .status(201)
      .json({ message: "Income muvaffaqiyatli yaratildi", income });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

// Barcha Incomelarni olish
const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find()
      .populate([{ path: "user_ref_id", path: "file_ref_id" }])
      .exec();
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

// Belgilangan ID bo'yicha Income olish
const getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate([
      { path: "user_ref_id", path: "file_ref_id" },
    ]);
    if (!income) {
      return res.status(404).json({ error: "Income topilmadi" });
    }
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

// Belgilangan ID bo'yicha Income o'zgartirish
const updateIncomeById = async (req, res) => {
  try {
    const { error } = incomeValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!income) {
      return res.status(404).json({ error: "Income topilmadi" });
    }

    res.json({ message: "Income muvaffaqiyatli o'zgartirildi", income });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};

// Belgilangan ID bo'yicha Income o'chirish
const deleteIncomeById = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ error: "Income topilmadi" });
    }
    res.json({ message: "Income muvaffaqiyatli o'chirildi", income });
  } catch (error) {
    res.status(500).json({ error: "Server xatosi" });
  }
};
module.exports = {
  createIncome,
  getAllIncomes,
  deleteIncomeById,
  updateIncomeById,
  getIncomeById,
};
