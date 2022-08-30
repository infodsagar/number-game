const express = require('express');

const router = express.Router();

const Note = require('../models/noteModel');

const {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require('../controllers/noteController');

const requireAuth = require('../middleware/requireAuth');

//Midleware auth req
router.use(requireAuth);

//Get all files
router.get('/', getNotes);

//Get a single file
router.get('/:id', getNote);

//Add file
router.post('/', createNote);

//Delete file
router.delete('/:id', deleteNote);

//Patch file
router.patch('/:id', updateNote);

module.exports = router;
