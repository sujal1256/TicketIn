import { Router } from "express";
import {
  handleAddUserToProject,
  handleGetProjectDetails,
  handleGetProjects,
  handleProjectCreation,
} from "../controllers/project.controller.js";


const projectRouter = Router();

projectRouter.route("/create-project").post(handleProjectCreation);

projectRouter.route("/").get(handleGetProjects);

projectRouter.route("/get-project-details").get(handleGetProjectDetails);

projectRouter.route('/add-user-to-project').post(handleAddUserToProject)

export { projectRouter };
