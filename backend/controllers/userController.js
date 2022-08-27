const User = require('../models/userModel');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //Created another function to check username is entered or email
  if (validator.isEmail(email)) {
    try {
      const user = await User.login(email, password);

      const token = createToken(user._id);

      res.status(200).json({ email });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      const user = await User.login2(email, password);

      const token = createToken(user._id);

      res.status(200).json({ email });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const signupUser = async (req, res) => {
  const { name, surname, username, email, password, dob } = req.body;

  try {
    const user = await User.signup(name, surname, username, email, password);

    res.status(200).json({ name, surname });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };