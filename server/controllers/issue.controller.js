import Issue from "../models/issue.model.js";
import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

async function handleIssueCreation(req, res) {
  const { issueTitle, issueStatus, issueDescription, assignedTo } = req.body;

  const projectId = req.query["projectId"];
  console.log(projectId);

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
    issueTitle: issueTitle.trim(),
    issueDescription: issueDescription.trim(),
    projectId,
    createdBy: createdByUser,
  });

  console.log("assignedTo", assignedTo);

  if (assignedTo) {
    console.log(project.members);

    const checkAssignedMember = project.members.find(
      (e) => e.userId == assignedTo
    );
    console.log(checkAssignedMember);
    if (checkAssignedMember) {
      issue.assignedTo = assignedTo;
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

  if(projectId == undefined || memberId == undefined){
    return res.status(400).json(new ApiError(400,"Values are not defined"));
  }


  const issues = await Issue.find({
    projectId: projectId,
    assignedTo: memberId,
  });
  
  return res.status(200).json(new ApiResponse(200, {issues: issues}, "Success in getting message for the member"));
}
export { handleIssueCreation, handleGetMemberIssues };
