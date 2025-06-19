const User = require('../models/user.model');

const registerUser = async (req, res) => {
  try {
    const { name, profilePhoto, username, password, about } = req.body;

        await User.create({
        name,
        profilePhoto,
        username,
        password,
        about,
    });

    return res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//todo: Return JWT token on successful login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
