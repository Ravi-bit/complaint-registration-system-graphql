import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  feedback_text: {
    type: String,
    required: true
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint'
  },
  feedbacker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}

});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
