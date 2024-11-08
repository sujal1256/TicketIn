import { Router } from "express";
import {
  checkInvitedUser,
  handleAddUserToProject,
  handleAddUserToProjectViaEmail,
  handleGetProjectDetails,
  handleGetProjects,
  handleProjectCreation,
} from "../controllers/project.controller.js";
import { authorizedToAdmin } from "../middlewares/admin.auth.middleware.js";

const projectRouter = Router();

projectRouter.route("/create-project").post(handleProjectCreation);

projectRouter.route("/").get(handleGetProjects);

projectRouter.route("/get-project-details").get(handleGetProjectDetails);

projectRouter
  .route("/add-user-to-project")
  .post(authorizedToAdmin, handleAddUserToProjectViaEmail);

export { projectRouter };
