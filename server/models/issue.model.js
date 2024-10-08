import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    issueTitle: {
        type: String,
        required: true,
    },
    issueDescription: {
        type: String,
    },
    issueStatus: {
        type: String,
        default: "Todo",
        enum: ["Todo", "Doing", "Done"]
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
        required: true,

    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },

});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;