//Import mongoose
const mongoose = require('mongoose');

//Assign schema func to schema
const Schema = mongoose.Schema;

//Create schema instance and define data structure
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', productSchema);
