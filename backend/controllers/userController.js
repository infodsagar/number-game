const loginUser = (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
};

const signupUser = (req, res) => {
  const { name, surname, username, email, password, dob } = req.body;
  console.log(name, surname, username, email, password, dob);
};

module.exports = { loginUser, signupUser };
