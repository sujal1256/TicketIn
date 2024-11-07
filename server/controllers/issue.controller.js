import Issue from "../models/issue.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

async function handleIssueCreation(req, res) {
  const { issueTitle, issueStatus, issueDescription, assignedTo, projectId } =
    req.body;

  // FIXME: issue status will depend on the section we add the issue, it can be Do, Done, Doing

  // logged in user is rqe.user who is the creater of issues
  // and the person can assign it can by given at creation or later as well
  if ([issueTitle].some((e) => e.trim() == undefined)) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const createdByUser = await User.findOne({ _id: req.user._id }).select(
    "-password -__v -createdAt -updatedAt"
  );

  // checking if projectId is valid or not
  const project = await Project.findOne({ _id: projectId });

  if (!createdByUser) {
    return res.status(400).json(new ApiError(400, "No createdByUser found"));
  }
  if (!project) {
    return res.status(400).json(new ApiError(400, "No project found"));
  }

  const issue = await Issue.create({
    issueTitle: issueTitle?.trim(),
    issueDescription: issueDescription?.trim(),
    projectId,
    createdBy: createdByUser,
    issueStatus,
  });

  if (assignedTo) {
    const checkAssignedMember = project.members.find((e) => {
      return e.userId == assignedTo;
    });

    if (checkAssignedMember) {
      issue.assignedTo = assignedTo;
      issue.assigned = true;
      await issue.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, issue, "Issue created successfully"));
}
async function handleGetMemberIssues(req, res) {
  const projectId = req.query["projectId"];
  const memberId = req.query["memberId"];

  if (projectId == undefined || memberId == undefined) {
    return res.status(400).json(new ApiError(400, "Values are not defined"));
  }

  const issues = await Issue.find({
    projectId: projectId,
    assignedTo: memberId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { issues: issues },
        "Success in getting message for the member"
      )
    );
}

async function handleGetUtrackedIssues(req, res) {
  const { projectId } = req.query;

  if (projectId == undefined) {
    return res.status(400).json(new ApiError(400, "Values are not defined"));
  }

  const issues = (await Issue.find({ projectId })).filter(
    (e) => e.assigned == false
  );

  if (!issues) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Project not found while getting untracked issues")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { issues: issues }, "Untracked issues fetched"));
}

async function handleGetIssueDetails(req, res) {
  const { projectId, selectedIssue } = req.query;

  if (!projectId || !selectedIssue) {
    return res
      .status(400)
      .json(new ApiError(400, "Value are not sent efficiently"));
  }

  const issue = await Issue.findOne({ projectId, _id: selectedIssue });

  console.log(issue);

  if (!issue) {
    return res.status(400).json(new ApiError(400, "issue not found"));
  }

  const assignedToUser = await User.findOne({ _id: issue.assignedTo }).select(
    "-password -__v"
  );
  const createdByUser = await User.findOne({ _id: issue.createdBy }).select(
    "-password -__v"
  );
  const project = await Project.findOne({ _id: projectId }).select("-members");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        issue: { issue, createdByUser, assignedToUser, project },
      },
      "Issue details fetched successfully"
    )
  );
}

async function handleUpdateIssue(req, res) {
  const {
    issueTitle,
    issueDescription,
    issueStatus,
    assignedTo,
    issueId,
    assigned,
  } = req.body;

  console.log("req.body", req.body);

  if (!issueTitle || !issueId) {
    return res
      .status(400)
      .json(new ApiError(400, "Data not received properly"));
  }

  const issue = await Issue.findOneAndUpdate(
    { _id: issueId },
    {
      $set: {
        issueTitle: issueTitle,
        issueDescription: issueDescription,
        issueStatus: issueStatus,
        assignedTo: assignedTo,
        assigned: assigned,
      },
    },
    { new: true }
  );

  const assignedToUser = await User.findOne({ _id: issue.assignedTo });
  const createdByUser = await User.findOne({ _id: issue.createdBy });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { issue: issue, assignedToUser, createdByUser },
        "Issue Update successfully"
      )
    );
}

async function handleDeleteIssue(req, res) {
  try {
    const { issueId } = req.body;

    if (!issueId) {
      return res
        .status(400)
        .json(new ApiError(400, "Issue to be deleted not found"));
    }

    const issue = await Issue.findOneAndDelete({ _id: issueId }).catch(
      (error) => {
        console.log("Error in deleting the issue", error.message);
      }
    );

    if (!issue) {
      return res.status(400).json(new ApiError(400, "Issue not found"));
    }

    console.log(issueId);
    console.log(issue);

    return res
      .status(200)
      .json(new ApiResponse(200, issue, "Issue successfully deleted"));
  } catch (error) {
    console.log("Error in deleting the issue", error.message);
  }
}

export {
  handleIssueCreation,
  handleGetMemberIssues,
  handleGetUtrackedIssues,
  handleGetIssueDetails,
  handleUpdateIssue,
  handleDeleteIssue,
};
