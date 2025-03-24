import { Router } from "express";
import {
  checkInvitedUser,
  handleAddUserToProject,
  handleAddUserToProjectViaEmail,
  handleGetProjectDetails,
  handleProjectCreation,
} from "../controllers/project.controller.js";
import { authorizedToAdmin } from "../middlewares/admin.auth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

projectRouter.route("/create-project").post(verifyJWT,handleProjectCreation);

projectRouter.route("/get-project-details").get(handleGetProjectDetails);

projectRouter
  .route("/add-user-to-project")
  .post(verifyJWT,authorizedToAdmin, handleAddUserToProjectViaEmail);

export { projectRouter };
