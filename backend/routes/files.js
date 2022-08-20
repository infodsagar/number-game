const express = require('express');

const router = express.Router();

const {
  createFile,
  getFiles,
  getFile,
  deleteFile,
  updateFile,
} = require('../controllers/fileController');

//Get all files
router.get('/', getFiles);

//Get a single file
router.get('/:id', getFile);

//Add file
router.post('/', createFile);

//Delete file
router.delete('/:id', deleteFile);

//Patch file
router.patch('/:id', updateFile);

module.exports = router;
