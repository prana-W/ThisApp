import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

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
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username is already taken!' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // It checks if the username and password are provided and are correct, then returns user object without password
    const user = await User.authenticateUser(username, password);

    if (user.error) {
      console.log(user.error);
      return res.status(401).json({ error: user.error });
    }

    // Adding username to the payload, which can be used to verify user everytime, it visits a route.
    const token = jwt.sign({ _id: user?._id, username: user?.username }, process.env.JWT_SECRET);

    console.log('Logged in user and added token to cookies');

    return res.status(200).cookie('token', token).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logoutUser = (req, res) => {
  try {
    if (!req.cookies.token) {
      console.log('No token found in cookies');
      return res.status(401).json({ error: 'No such user found!' });
    }
    return res.status(200).clearCookie('token').json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message });
  }
};

export { registerUser, loginUser, logoutUser };
