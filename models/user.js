import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  roll_no : {
    type: BigInt,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
export default User;
