import User from '../models/user.model.js';

const getUserFromDB = async (req, res) => {
  try {
    const username = await req.params['username'];
    const user = await User.findOne({ username }).populate('friends', 'chat');

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(200).json({
      ...user._doc,
      password: undefined,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err?.message,
    });
  }
};

const getAllUsersFromDB = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(404).json({
        error: 'No users found',
      });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err?.message,
    });
  }
};

export { getUserFromDB, getAllUsersFromDB };
