import User from '../models/user.model';

const getUserFromDB = async (req, res) => {
  try {
    const searchParameter = req.params['username'] || req.params['_id'];

    const user = await User.findOne({ searchParameter }).populate('friends', 'chat');

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(200).json({
      ...user,
      password: undefined,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err?.message,
    });
  }
};

export { getUserFromDB };
