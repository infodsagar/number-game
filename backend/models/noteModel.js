//Import mongoose
const mongoose = require('mongoose');

//Assign schema func to schema
const Schema = mongoose.Schema;

//Create schema instance and define data structure
const noteSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
