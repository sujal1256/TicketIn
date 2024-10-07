import { Router } from "express";
import { handleProjectCreation } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.route("/create-project").post(handleProjectCreation);

export { projectRouter };
