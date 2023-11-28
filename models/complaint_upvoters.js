import mongoose from 'mongoose';

const complaintUpvoterSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  complaint_id: {
      type: Schema.Types.ObjectId,
      ref: 'Complaint'
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date()
  }
});

const ComplaintUpvoter = mongoose.model('Complaint', complaintUpvoterSchema);
export default ComplaintUpvoter;
