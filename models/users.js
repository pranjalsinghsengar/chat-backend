const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String, unique: true},
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  friendRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  friend: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  sendFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
