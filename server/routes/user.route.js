import express from "express";
import { handleUserRegister, handleUserSignin } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter
  .route("/signup") 
  .get((req, res) => res.send("Signup"))
  .post(handleUserRegister);

userRouter.route('/signin').get((req, res) => req.send('Signin')).post(handleUserSignin)



export { userRouter };
   