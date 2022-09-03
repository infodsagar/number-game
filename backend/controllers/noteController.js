const Note = require('../models/noteModel');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//Setup AWS
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

//Setup upload function
const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

//Add file
const createNote = (req, res, next) => {
  const uploadSingle = upload('profile-picture-upload-youtube').single('image');

  uploadSingle(req, res, async (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

    res.status(200).json({ data: req.file });
  });

  // let emptyFields = [];

  // if (!file) {
  //   emptyFields.push('file');
  // }

  // if (emptyFields.length > 0) {
  //   return res.status(400).json({ error: 'Please enter file', emptyFields });
  // }

  // try {
  //   const user_id = req.user.id;
  //   const note = await Note.create({ file, user_id });
  //   res.status(200).json({ data: note });
  // } catch (err) {
  //   res.status(400).json({ err: err.message });
  // }
};

//Get all products
const getNotes = async (req, res) => {
  const user_id = req.user._id;

  const notes = await Note.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

//Get a single product
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: 'No product found' });
  }

  res.status(200).json(note);
};

//Add new note
const createNote2 = async (req, res) => {
  const { text, file } = req.body;

  let emptyFields = [];

  if (!text) {
    emptyFields.push('text');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please enter text', emptyFields });
  }

  try {
    const user_id = req.user.id;
    const note = await Note.create({ text, file, user_id });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//Delete product
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    res.status(404).json({ error: 'No such Note' });
  }

  res.status(200).json(note);
};

//Patch qty
const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    res.status(404).json({ error: 'No such product' });
  }

  res.status(200).json(note);
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
};
