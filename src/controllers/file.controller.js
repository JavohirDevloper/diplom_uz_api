const File = require("../models/File");
const Joi = require("joi");

const fileValidationSchema = Joi.object({
  file_name: Joi.string().required(),
  size_file: Joi.number().required(),
  page: Joi.number().required(),
  hashtag: Joi.string().required(),
  type_file: Joi.string().required(),
  stars: Joi.number().required(),
  sub_ref_id: Joi.string().required(),
});

const createFile = async (req, res) => {
  try {
    const { error } = fileValidationSchema.validate(req.body);

    const file = new File({
      file_name: req.file.filename,
      file: "/" + req.file.path,
      size_file: req.body.size_file,
      page: req.body.page,
      hashtag: req.body.hashtag,
      type_file: req.body.type_file,
      stars: req.body.stars,
      sub_ref_id: req.body.sub_ref_id,
    });
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getFileByID = async (req, res) => {
  try {
    const fileId = req.params.id;
    let file;
    file = await File.findOne({ file_name: fileId }).populate("sub_ref_id");
    if (!file) {
      file = await File.findById(fileId).populate("sub_ref_id");
    }

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.download(file.file);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const updatedFile = await File.findByIdAndUpdate(fileId, req.body, {
      new: true,
    });
    if (!updatedFile) {
      return res.status(404).json({ error: "File not found" });
    }
    res.json(updatedFile);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findOneAndDelete({ file_name: fileId });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = {
  createFile,
  getFileByID,
  updateFile,
  deleteFile,
};
