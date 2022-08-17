//Imported express
const express = require('express');

//Import dotenv
require('dotenv').config();

//Created new app instance of express
const app = new express();

//Middleware to log connection
app.use((req, res, next) => {
  console.log('Connected on port ' + process.env.PORT);
  next();
});

//Router
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Server waiting for req
app.listen(process.env.PORT, () => {
  console.log('waiting on port ' + process.env.PORT);
});
