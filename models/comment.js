const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  comment_text: {
    type: String,
    required: true
  },
  upvote: {
    type: Number,
    required: true,
    default: 0
  },
  downvote: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  complaint: {
      type: Schema.Types.ObjectId,
      ref: 'Complaint'
  },
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}

});

const Comment = mongoose.model('Comment', eventSchema);
export default Comment;
