import express from "express";
import {
  handleGetProjects,
  handleUserRegister,
  handleUserSignin,
  handleUserSignOut,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

const userRouter = express.Router();

userRouter.get("/", verifyJWT, (req, res) =>
  res
    .status(200)
    .json(
      new ApiResponse(200, req.user, "Check if the user is logged in or not")
    )
);

userRouter
  .route("/signup")
  .get((req, res) =>
    res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "Check if the user is logged in or not")
      )
  )
  .post(handleUserRegister);

userRouter
  .route("/signin")
  .get((req, res) =>
    res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "Check if the user is logged in or not")
      )
  )
  .post(handleUserSignin);

userRouter.route("/signout").get(verifyJWT, handleUserSignOut);
userRouter.route("/get-projects").get(verifyJWT, handleGetProjects);

export { userRouter };
