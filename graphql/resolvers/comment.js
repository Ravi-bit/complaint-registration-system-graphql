import Comment from '../../models/comment';
import {transformComplaint, transformDetailComplaint} from '../../helpers/common';

export default {
    createComment : async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        } 
        let complaint = new Comment({
            comment_text: args.commentInput.comment_text,
            createdAt: new Date(args.commentInput.createdAt),
            complaint: args.commentInput.complaint_id,
            commenter: req.userId
        });
        try {
            let result = await complaint.save();
            return transformComplaint(result);
          } catch (err) {
            throw err;
          }
    },


    listComments: async ({ status, userId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        let conditions = status ? {status} : {};
        conditions = userId ? { ...conditions, complainee: userId } : conditions;
        try {
          const complaints = await Complaint.find(conditions);
          return complaints.map(complaint => {
            return transformComplaint(complaint);
          });
        } catch (err) {
          throw err;
        }
    }

}