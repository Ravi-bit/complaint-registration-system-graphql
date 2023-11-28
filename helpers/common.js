import User from '../models/user';
import ComplaintUpvoter from '../models/complaint_upvoters';

const dateToString = date => new Date(date).toISOString();
  
const user = async userId => {
    try {
        let user = await User.findOne({
            _id: userId
        },
        {
            name: 1,
            identification_number: 1,
            _id: 1,
            email: 1,
            password: 0,
            createdAt: 0,
            role: 0
        }
        );
      return {
        ...user._doc,
        _id: user.id
      };
    } catch (err) {
      throw err;
    }
  };

const transformComplaint = complaint => {
    return {
        ...complaint._doc,
        _id: complaint.id,
        createdAt: dateToString(complaint._doc.createdAt),
        updatedAt: dateToString(complaint._doc.updatedAt),
        complainee: user.bind(this, complaint.complainee)
      };
};


const getupVoteStatus = async (cid, uid) => {
  let upvoter = await User.findOne({
    complaint_id : cid,
    user_id: uid
  });
  return upvoter ? true: false;
}

const transformDetailComplaint = (complaint, userId) => {
     return {
      complaint: {
        ...complaint._doc,
        _id: complaint.id,
        createdAt: dateToString(complaint._doc.createdAt),
        updatedAt: dateToString(complaint._doc.updatedAt)
      },
      upvoted: getupVoteStatus(complaint.id, userId),
      viewer: user.bind(this, userId)
     }
}

export {
    transformComplaint,
    transformDetailComplaint
}