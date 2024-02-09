const { View } = require("../models/Views");

const getViews = async (req, res) => {
  try {
    const views = await View.find().populate([
      { path: "user_ref_id" },
      { path: "file_ref_id" },
    ]);
    res.json(views);
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

const getViewsId = async (req, res) => {
  const { id } = req.params;

  try {
    const view = await View.findById(id).populate([
      { path: "user_ref_id" },
      { path: "file_ref_id" },
    ]);
    res.json(view);
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

const deleteViews = async (req, res) => {
  const { id } = req.params;

  try {
    await View.findByIdAndDelete(id);
    res.json({ message: "View muvaffaqiyatli o'chirildi" });
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

const createView = async (req, res) => {
  const { user_ref_id, file_ref_id } = req.body;
  try {
    const view = new View({ user_ref_id, file_ref_id });
    const savedView = await view.save();
    const populatedView = await savedView.populate([
      { path: "user_ref_id", params: "file_ref_id" },
    ]);
    res.json(populatedView);
  } catch (err) {
    res.status(500).json({ error: "Serverda xatolik yuz berdi" });
  }
};

module.exports = {
  getViews,
  getViewsId,
  deleteViews,
  createView,
};
