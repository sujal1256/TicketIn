import Project from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

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
          userName: projectOwner.userame,
          userRole: "Admin",
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

async function handleGetProjects(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json(new ApiError(401, "User not found"));
    }

    const userId = user.id;
    console.log("userId", userId);

    const projects = await Project.find({ projectOwner: userId });
    console.log(projects);

    return res
      .status(200)
      .json(new ApiResponse(200, projects, "Projects created by user"));
  } catch (error) {
    console.log("Error in getting projects", error.message);
  }
}

// async function handleAddMemberToProject(req, res) {
//   // Get the email from body
//   // Check if email is ok
//   // Get user based on email
//   // Check if user is valid
//   //
// }

export { handleProjectCreation, handleGetProjects };
