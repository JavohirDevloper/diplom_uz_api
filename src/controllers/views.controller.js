const { View } = require("../models/Views");

const getViews = async (req, res) => {
  try {
    const views = await View.find().populate("user_ref_id");
    res.json(views);
  } catch (err) {
    console.error("Viewsni o'qishda xatolik yuz berdi:", err);
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

const getViewsId = async (req, res) => {
  const { id } = req.params;

  try {
    const view = await View.findById(id).populate("user_ref_id");
    res.json(view);
  } catch (err) {
    console.error(
      `ID bo'yicha viewni qidirishda xatolik yuz berdi: ${id}`,
      err
    );
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

const deleteViews = async (req, res) => {
  const { id } = req.params;

  try {
    await View.findByIdAndDelete(id);
    res.json({ message: "View muvaffaqiyatli o'chirildi" });
  } catch (err) {
    console.error(
      `ID bo'yicha viewni o'chirishda xatolik yuz berdi: ${id}`,
      err
    );
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

const createView = async (req, res) => {
  const { user_ref_id } = req.body;
  try {
    const view = new View({ user_ref_id });
    const savedView = await view.save();
    const populatedView = await savedView.populate("user_ref_id");
    res.json(populatedView);
  } catch (err) {
    console.error("View yaratishda xatolik yuz berdi:", err);
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

module.exports = {
  getViews,
  getViewsId,
  deleteViews,
  createView,
};
