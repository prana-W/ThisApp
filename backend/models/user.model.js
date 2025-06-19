const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);
module.exports = User;
