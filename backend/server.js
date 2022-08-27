const mongoose = require('mongoose');

//Imported express
const express = require('express');

//Import dotenv
require('dotenv').config();

const fileRoutes = require('./routes/files');
const userRoutes = require('./routes/users');

//Created new app instance of express
const app = new express();

//Parse json
app.use(express.json());

//Middleware to log connection
app.use((req, res, next) => {
  console.log('Connected on port ' + process.env.PORT);
  console.log(req.path, req.method);
  next();
});

app.use('/api/files', fileRoutes);
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
