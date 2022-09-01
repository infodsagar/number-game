const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Import Multer
const multer = require('multer');

//Imported express
const express = require('express');

//Import dotenv
require('dotenv').config();

const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');

//Created new app instance of express
const app = new express();

//Parse json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Save file local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//Upload file
const upload = multer({ storage: storage });

//Middleware to log connection
app.use((req, res, next) => {
  console.log('Connected on port ' + process.env.PORT);
  console.log(req.path, req.method);
  next();
});

app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Server waiting for req
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & waiting on port ' + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(err);
  });
