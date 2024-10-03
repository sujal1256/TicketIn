import express from "express";
import { createUserAfterSignup } from "../cotrollers/user.controller.js";

const userRouter = express.Router();

userRouter
  .route("/register")
  .get((req, res) => res.send("Signup"))
  .post(createUserAfterSignup);

export { userRouter };
 