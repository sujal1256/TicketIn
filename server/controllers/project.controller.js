import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import nodemailer from "nodemailer";
import { generateInvitationToken } from "../utils/constants.util.js";
import jwt from "jsonwebtoken";
import { handleAddUserEmail } from "../utils/mailer.js";

async function handleProjectCreation(req, res) {
  // members will be only 1 the owner itself

  // get the data from Body -> projectName, projectDescription, startDate, endDate
  // check if the values are valid or not
  // get the projectOwner from req ( as we have done verifyJWT)
  // check if we get the user or not
  // At first there is only 1 member which is the owner itself
  // Create the Project
  try {
    const { projectName, projectDescription, startDate, endDate } = req.body;

    if (
      [projectName, projectDescription, startDate].some(
        (e) => e.trim() == undefined
      )
    ) {
      return res
        .status(400)
        .json(new ApiError(400, "Values for project creation are not valid"));
    }

    const projectOwner = req.user;

    if (!projectOwner) {
      return res
        .status(400)
        .json(new ApiError(400, "User is not signed in || User not found"));
    }

    const project = await Project.create({
      projectName,
      projectDescription,
      startDate: startDate.split("T")?.[0],
      endDate: endDate.split("T")?.[0],
      projectOwner: projectOwner._id,
      members: [
        {
          userId: projectOwner._id,
          userName: projectOwner.username,
          userRole: "Admin",
          userEmail: projectOwner.email,
        },
      ],
    });

    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project created successfully"));
  } catch (error) {
    return res
      .status(400)
      .json(
        new ApiError(400, `Error in creating the project -> ${error.message}`)
      );
  }
}

async function handleGetProjectDetails(req, res) {
  try {
    // creats a map of serch queries
    const {projectId} = req.query;
    console.log("projectId", projectId);
    
    if(!projectId){
      return res.status(400).json(new ApiError(400, "Project Id is not valid"));
    }

    const projectDetails = await Project.findOne({ _id: projectId }).select(
      "-_id -__v -createdAt -updatedAt"
    );
    const projectOwner = await User.findOne({
      _id: projectDetails.projectOwner,
    }).select("-_id -password -__v -createdAt -updatedAt");

    // console.log(projectDetails, projectOwner);

    if (!projectDetails || !projectOwner) {
      return res
        .status(400)
        .json(new ApiError(400, "Error in getting project details"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { projectDetails: projectDetails, projectOwner: projectOwner },
          "Project Details fetched successfully"
        )
      );
  } catch (error) {
    console.log("Error in getting project details" + error.message);
  }
}

async function handleAddUserToProject(req, res) {
  // Get the email from body
  // Check if email is ok
  // Get user based on email
  // Check if user is valid
  const { projectId, email } = req.body;

  if (!projectId || !email) {
    return res.status(400).json(new ApiError(400, "Values are not valid"));
  }

  const project = await Project.findOne({ _id: projectId });

  //  get the user if the user exists add the user to members of the project if the user does not exist then create a user and then add it
  // FIXME: As we will be sending a confirmation mail while adding the user so the person will signup first after clicking on confirmation link

  let user = await User.findOne({ email });

  // console.log("user1", user);

  // console.log("email", email);

  if (!user) {
    user = await User.create({
      username: "Default",
      email: email,
      password: "123",
    });
  }

  // console.log("user2", user);
  let alreadyExists = true;
  project.members.forEach((e) => {
    // console.log(e.userEmail, email);
    if (e.userEmail == email) {
      alreadyExists = false;
    }
  });

  if (!alreadyExists) {
    return res
      .status(400)
      .json(new ApiError(400, "User is already added in the project"));
  }
  await project.members.push({
    userName: user.username,
    userId: user._id,
    userRole: user.userRole,
    userEmail: email,
  });

  await project.save();
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Member Added successfully"));
}

async function checkInvitedUser(req, res) {
  const { token } = req.query;

  console.log(token);

  try {
    if (!token) {
      return res.status(500).json(new ApiError(500, "Token not found"));
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACESS_TOKEN_SECRET_KEY
    );

    if (!decodedToken) {
      return res.status(500).json(new ApiError(500, "token expired"));
    }

    console.log("decodedToken", decodedToken);

    const user = await User.findOne({ email: decodedToken.userId });
    if (!user) {
      return res
        .status(400)
        .json(new ApiError(400, "User not found redirect to /signup"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User found rediect to /"));
  } catch (error) {
    console.log(error);
  }
}
async function handleAddUserToProjectViaEmail(req, res) {
  try {
    const { projectId, email } = req.body;

    if (!projectId || !email) {
      return res.status(400).json(new ApiError(400, "Values are not valid"));
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(500).json(new ApiError(400, "Project Not found"));
    }

    const projectOwner = await User.findOne({ _id: project?.projectOwner });

    if (!projectOwner) {
      return res.status(400).json(new ApiError(400, "Project Owner not found"));
    }
    handleAddUserEmail(project, email, projectOwner, res).catch((err) =>
      console.log("❌ Error in sending the mail", err.message)
  );

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Email sent successfully"));
  } catch (error) {
    console.log("❌ Error in sending the mail", error.message);
  }
}

export {
  handleProjectCreation,
  handleGetProjectDetails,
  handleAddUserToProject,
  handleAddUserToProjectViaEmail,
  checkInvitedUser,
};
