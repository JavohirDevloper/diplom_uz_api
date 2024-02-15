const File = require("../models/File");
const Joi = require("joi");
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const trimmedFileName = file.originalname.replace(/\s+/g, "").toLowerCase();
    cb(null, Date.now() + "_" + trimmedFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Faqat video fayllariga ruxsat beriladi!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("videos");

const fileValidationSchema = Joi.object({
  name: Joi.string().required(),
  hashtag: Joi.string(),
  size_file: Joi.number(),
  type_file: Joi.string(),
  stars: Joi.number(),
  user_ref_id: Joi.string(),
});

const createFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { error } = fileValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      console.log(req.body);
      if (!req.file) {
        return res.status(400).json({ error: "File is required" });
      }

      const fileData = {
        name: req.file.originalname,
        file: "/" + req.file.path,
        size_file: req.body.size_file,
        hashtag: req.body.hashtag,
        type_file: req.body.type_file,
        stars: req.body.stars,
        user_ref_id: req.body.user_ref_id,
      };

      const file = new File(fileData);

      try {
        const savedFile = await file.save();
        res.status(201).json(savedFile);
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};
const getFileByID = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id).populate("user_ref_id");
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error });
  }
};


const updateFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const updatedFile = await File.findByIdAndUpdate(fileId, req.body, {
      new: true,
    });
    if (!updatedFile) {
      return res.status(404).json({ error });
    }
    res.json(updatedFile);
  } catch (error) {
    res.status(500).json({ error });
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
    res.status(500).json({ error });
  }
};
module.exports = {
  createFile,
  getFileByID,
  updateFile,
  deleteFile,
  upload,
};
