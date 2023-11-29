import Feedback from '../../models/feedback.js';
import {getComplaint, transformFeedback} from '../../helpers/common.js';

export default {
    createFeedback: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        let req_complaint = getComplaint(args.feedbackInput.complaint_id, 'Resolved');
        if (!req_complaint) {
            throw new Error('Complaint is not yet resolved');
        }
        if (req_complaint.complainee != req.userId) {
            throw new Error('You are not authorized to give feedback');
        }
        try {
            let exist_feedback = await Feedback.findOne({
                complaint: args.feedbackInput.complaint_id,
                feedbacker: req.userId
            });
            if (exist_feedback) {
                throw new Error('Feedback already exists on this complaint');
            }
            const feedback = new Feedback({
                feedback_text: args.feedbackInput.feedback_text,
                createdAt: new Date(args.feedbackInput.createdAt),
                complaint: args.feedbackInput.complaint_id,
                feedbacker: req.userId
            });
            let result = await feedback.save();
            return transformFeedback(result);
        } catch (err) {
            throw err;
        }
    },


    getFeedbackup: async ({ complaintId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        let req_complaint = getComplaint(complaintId, 'Resolved');
        if (!req_complaint) {
            throw new Error('Complaint is not yet resolved');
        }
        if (req_complaint.complainee != req.userId) {
            throw new Error('You are not authorized to give feedback');
        }
        try {
            let feedback = await Feedback.findOne({
                complaint: complaintId,
                feedbacker: req.userId
            });
            return transformFeedback(feedback);
        } catch (err) {
            throw err;
        }
    }
};