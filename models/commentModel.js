const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.ObjectId, required: true }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
