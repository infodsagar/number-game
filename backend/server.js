//Imported express
const express = require('express');

//Import dotenv
require('dotenv').config();

const fileRoutes = require('./routes/files');
const userRoutes = require('./routes/users');

//Created new app instance of express
const app = new express();

//Middleware to log connection
app.use((req, res, next) => {
  console.log('Connected on port ' + process.env.PORT);
  next();
});

app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);

//Server waiting for req
app.listen(process.env.PORT, () => {
  console.log('waiting on port ' + process.env.PORT);
});
