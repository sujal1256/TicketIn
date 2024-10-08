import { Router } from "express";
import { handleGetProjects, handleProjectCreation } from "../controllers/project.controller.js";
import Project from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

const projectRouter = Router();

projectRouter.route("/create-project").post(handleProjectCreation);

projectRouter.route("/").get(handleGetProjects);

export { projectRouter };
