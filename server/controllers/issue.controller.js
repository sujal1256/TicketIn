import Issue from "../models/issue.model";
import User from "../models/user.model";
import { ApiError } from "../utils/ApiError.util";
import { ApiResponse } from "../utils/ApiResponse.util";

async function handleIssueCreation(req, res) {
  const { issueTitle, issueStatus, issueDescription, createdBy, assignedTo } =
    req.body;

  if ([issueTitle].some((e) => e.trim() == undefined)) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const createdByUser = await User.findOne({ createdBy }).select(
    "-password -__v -createdAt -updatedAt"
  );
  

  if (!createdByUser) {
    return res
      .status(400)
      .json(
        new ApiError(400, "Error in assigning the user while creating issue")
      );
  }

  const issue = await Issue.create({
    issueTitle: issueTitle.trim(),
    issueDescription: issueDescription.trim(),
    ass: issueTitle.trim(),
    issueTitle: issueTitle.trim(),
    createdBy,
    assignedTo,
  });

  return res.status(200).json(new ApiResponse(200, issue, "Issue created successfully"));
}

export { handleIssueCreation };
