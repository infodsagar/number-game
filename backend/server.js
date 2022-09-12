const mongoose = require('mongoose');

//Imported express
const express = require('express');

//Import dotenv
require('dotenv').config();

//Import path
const path = require('path');

//Static assests
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const noteRoutes = require('./routes/notes');
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

app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

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
