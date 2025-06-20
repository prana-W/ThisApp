const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    profilePhoto: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      default: 'Hey, there I am using ThisApp!',
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      },
    ],
  },
  { timestamps: true },
);

// Hash password before saving the user document
userSchema.pre('save', async function (next) {
  try {
    console.log(this);

    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);

    console.log(this.password);
    return next();
  } catch (err) {
    console.error(err);
    return;
  }
});

// Static method to authenticate user and return a user object (without password)
userSchema.static('authenticateUser', async function (username, password) {
  try {
    const user = await this.findOne({ username }).populate('friends', 'chats');

    if (!user) {
      return {
        error: 'No such user found!',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        error: 'Invalid password!',
      };
    }

    return {
      _id: user._id,
      username: user.username,
    };
  } catch (err) {
    return {
      error: err,
    };
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
