import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  complaint_category: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  complaint_details: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 0
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
  complainee: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
