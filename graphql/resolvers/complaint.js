import Complaint from '../../models/complaint';
import {transformComplaint} from '../../helpers/common';

export default {
    createComplaint : async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        } 
        let complaint = new Complaint({
            complaint_category: args.complaintInput.complaint_category,
            section: args.complaintInput.section,
            complaint_details: args.complaintInput.complaint_details,
            createdAt: new Date(args.complaintInput.createdAt),
            complainee: req.userId
        });
        try {
            let result = await complaint.save();
            return transformComplaint(result);
          } catch (err) {
            throw err;
          }
    },


    listComplaints: async ({ status, userId }, req) => {
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
    },

    upVoteComplaint: async ({ complaintId }) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId,
                    status : 'Active'
                }, {
                    upvote:1
                }
            );
            if (!complaint) {
                throw new Error("Complaint doesn't exist or may be a resolved complaint")
            }
            const result = await Complaint.updateOne(
                { _id: complaintId },
                { $set: { upvote: complaint._doc.upvote++ } }
              );
        } catch (err) {
            throw err;
        }
        
    },

    downVoteComplaint: async ({ complaintId }) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId,
                    status : 'Active'
                }, {
                    downvote:1
                }
            );
            if (!complaint) {
                throw new Error("Complaint doesn't exist or may be a resolved complaint")
            }
            const result = await Complaint.updateOne(
                { _id: complaintId },
                { $set: { downvote: complaint._doc.downvote++ } }
              );
        } catch (err) {
            throw err;
        }
        
    },

    resolveComplaint: async ({ complaintId }) => {
        if (!req.isDeanAuth) {
            throw new Error('Unauthorized dean to perform the operation');
        }

        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId,
                    status : 'Active'
                }, {
                    status:1
                }
            );
            if (!complaint) {
                throw new Error("Complaint doesn't exist or may be a resolved complaint")
            }
            const result = await Complaint.updateOne(
                { _id: complaintId },
                { $set: { status: 'Resolved' } }
              );
        } catch (err) {
            throw err;
        }
    }

}