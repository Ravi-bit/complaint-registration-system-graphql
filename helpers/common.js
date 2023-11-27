import User from '../models/user';

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

export {
    transformComplaint
}