import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
