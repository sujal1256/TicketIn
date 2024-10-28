import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "issues",
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "issues",
      required: true
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true
    },
    createdByName: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;