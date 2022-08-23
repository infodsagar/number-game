//Import mongoose
const mongoose = require('mongoose');

//Assign schema func to schema
const Schema = mongoose.Schema;

//Create schema instance and define data structure
const fileSchema = new Schema(
  {
    file: {
      type: Buffer,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
