import Comment from '../../models/comment.js';
import {transformComment, transformCreatedComment} from '../../helpers/common.js';

export default {
  createComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized client');
    }
    const comment = new Comment({
      comment_text: args.commentInput.comment_text,
      createdAt: new Date(args.commentInput.createdAt),
      complaint: args.commentInput.complaint_id,
      commenter: req.userId
    });
    try {
      let result = await comment.save();
      return transformCreatedComment(result);
    } catch (err) {
      throw err;
    }
  },


  listComments: async ({ complaintId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized client');
    }
    try {
      const comments = await Comment.find({
        complaint: complaintId
      });
      return comments.map(comment => {
        return transformComment(comment, complaintId);
      });
    } catch (err) {
      throw err;
    }
  }

};