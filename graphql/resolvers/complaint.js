import Complaint from '../../models/complaint.js';
import {transformComplaint, transformDetailComplaint, transformResolvedComplaint} from '../../helpers/common.js';

export default {
    createComplaint: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        const complaint = new Complaint({
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
        let conditions = status ? { status } : {};
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

    upVoteComplaint: async ({ complaintId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId,
                    status: 'Active'
                }
            );
            if (!complaint) {
                throw new Error("Complaint doesn't exist or may be a resolved complaint");
            }
            let result = await Complaint.updateOne(
                { _id: complaintId },
                { $set: { upvotes: complaint._doc.upvotes++ } });
            return transformComplaint(result);
        } catch (err) {
            throw err;
        }
        
    },

    viewComplaint: async ({ complaintId, userId }, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthorized client');
        }
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: complaintId,
                    status: 'Active'
                }
            );
            if (!complaint) {
                throw new Error("Complaint doesn't exist or may be a resolved complaint");
            }

            let result = await Complaint.updateOne(
                { _id: complaintId },
                { $set: { views: complaint._doc.views++ } });
            return transformDetailComplaint(result, userId);
        } catch (err) {
            throw err;
        }
        
    },

    resolveComplaint: async (args, req) => {
        if (!req.isDeanAuth) {
            throw new Error('Unauthorized dean to perform the operation');
        }
        let new_text = args.resolveInput.resolveText ? args.resolveInput.resolveText : '';
        try {
            let complaint = await Complaint.findOne(
                {
                    _id: args.resolveInput.complaintId,
                    status: 'Active'
                }, {
                status: 1
            }
            );
            if (!complaint) {
                throw new Error("Complaint doesn't exist or may be a resolved complaint")
            }
            let result = await Complaint.updateOne(
                { _id: args.resolveInput.complaintId },
                {
                    $set: {
                        status: 'Resolved',
                        resolvement: new_text,
                        resolvedAt: new Date(args.resolveInput.resolvedAt),
                        resolvedBy: req.userId
                    }
                }
            );
            return transformResolvedComplaint(result);
        } catch (err) {
            throw err;
        }
    }

};