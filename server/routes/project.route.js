import { Router } from "express";
import {
  handleGetProjectDetails,
  handleGetProjects,
  handleProjectCreation,
} from "../controllers/project.controller.js";


const projectRouter = Router();

projectRouter.route("/create-project").post(handleProjectCreation);

projectRouter.route("/").get(handleGetProjects);

projectRouter.route("/get-project-details").get(handleGetProjectDetails);

export { projectRouter };
