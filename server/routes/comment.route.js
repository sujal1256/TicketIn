import express from "express";
import {
  handleAddComment,
  handleDeleteComment,
  handleGetIssueComments,
  handleUpdateComment,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.route("/add-comment").post(handleAddComment);

commentRouter.route("/get-all-comments").get(handleGetIssueComments);

commentRouter.route("/update-comment").post(handleUpdateComment);

commentRouter.route("/delete-comment").post(handleDeleteComment);


export default commentRouter;
