import Issue from "../models/issue.model.js";
import Comment from "../models/comments.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import Project from "../models/project.model.js";

async function handleAddComment(req, res) {
  try {
    const { issueId, commentText, projectId } = req.body;
    console.log(issueId, commentText, projectId);
    
    if (
      [commentText?.trim(), issueId?.trim(), projectId?.trim()].some(
        (e) => e == undefined
      )
    ) {
      res.status(400).json(new ApiError(400, "Values not sent properly"));
    }

    const issue = await Issue.findOne({ _id: issueId });

    if (!issue) {
      res.send(400).json(new ApiError(400, "Issue not found"));
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      res.send(400).json(new ApiError(400, "Project not found"));
    }

    const comment = await Comment.create({
      commentText,
      createdBy: req.user?._id,
      issueId,
      createdByName: req.user?.username,
      projectId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment created successfully"));
  } catch (error) {
    console.log("Error in comment creation", error.message);
  }
}

async function handleGetIssueComments(req, res) {
  try {
    const { issueId, projectId } = req.query;

    if ([issueId?.trim(), projectId?.trim()].some((e) => e == undefined)) {
      return res
        .status(400)
        .json(new ApiError(400, "Values are not provided properly"));
    }

    const comments = await Comment.find({
      issueId: issueId,
      projectId: projectId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, comments, "All comments fetched"));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
}

async function handleUpdateComment(req, res) {
  try {
    const { newCommentText, commentId, issueId, projectId } = req.body;

    if (
      [
        newCommentText?.trim(),
        projectId?.trim(),
        commentId?.trim(),
        issueId?.trim(),
      ].some((e) => e == undefined)
    ) {
      return res
        .status(400)
        .json(new ApiError(400, "Values are not provided properly"));
    }

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, issueId: issueId, projectId: projectId },
      {
        $set: {
          commentText: newCommentText,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment updated successfully"));
  } catch (error) {
    return res.status(400).json(new ApiError(400, error.message));
  }
}

async function handleDeleteComment(req, res) {
  try {
    const { commentId, issueId, projectId } = req.body;

    if (
      [projectId?.trim(), commentId?.trim(), issueId?.trim()].some(
        (e) => e == undefined
      )
    ) {
      return res
        .status(400)
        .json(new ApiError(400, "Values are not provided properly"));
    }

    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      issueId: issueId,
      projectId: projectId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, comment, "Comment deleted successfully"));
  } catch (error) {
    console.log("Error in deleting comment", error.message);
    return res.status(400).json(new ApiError(400, error.message));
  }
}
export {
  handleAddComment,
  handleGetIssueComments,
  handleUpdateComment,
  handleDeleteComment,
};
