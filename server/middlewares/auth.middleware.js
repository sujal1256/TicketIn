import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

const verifyJWT = async function (req, res, next) {
  try {
    const token =
      req.cookies["accessToken"] ||
      req.headers.authorization.split("Bearer ")[1];

    if (!token) {
      console.log("token is not found");

      return res
        .status(400)
        .json(new ApiError(401, "Unable to verify the token"));
    }

    const decodedToken = jwt
      .verify(token, process.env.ACESS_TOKEN_SECRET_KEY)

    if (!decodedToken) {
      console.log("token expired");
      return res
        .status(400)
        .json(new ApiError(401, "Unable to verify the token"));
    }

    const id = decodedToken?._id;

    const user = await User.findOne({ _id: id }).select(
      "-password -createdAt -updatedAt -__v"
    );

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(400, `Error verifying JWT: ${error.message}`));
  }
};

export { verifyJWT };
