import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { sendOtpToUser } from "../utils/mailer.js";

async function handleUserRegister(req, res) {
  let { username, email, password } = req.body;
  username = username?.trim();
  email = email?.trim();
  password = password?.trim();

  if ([username, email, password].some((e) => e == undefined)) {
    return res
      .status(400)
      .json(
        new ApiError(401, "Values while signing in the user are undefined")
      );
  }

  if (!email.includes("@")) {
    return res.status(400).json(new ApiError(400, "Email is not valid"));
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(400).json(new ApiError(401, "Email already registered"));
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
}

async function handleUserSignin(req, res) {
  try {
    let { email, password } = req.body;
    email = email?.trim();
    password = password?.trim();

    // check if any value is undefined
    if ([email, password].some((e) => e == undefined)) {
      return res
        .status(401)
        .json(
          new ApiError(401, "Values while signing in the user are undefined")
        );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(new ApiError(401, "User not found"));
    }

    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
      return res.status(401).json(new ApiError(401, "Incorrect Password"));
    }

    // Make a JWT token and pass it to cookies
    const token = await user.generateAccessToken();

    // we donot want to send password to the frontend

    const userToSend = user.toObject();
    delete userToSend.password;
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { ...userToSend, accessToken: token },
          "Signin successfull"
        )
      );
  } catch (error) {
    return res
      .status(400)
      .json(new ApiError(401, "Error occurred while signin In"));
  }
}

async function handleUserSignOut(req, res) {
  if (req.user == null) {
    return res.status(400).json(new ApiError(400, "User not signed in"));
  }
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Logout successfull"));
}

async function handleGetProjects(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json(new ApiError(400, "User not found"));
    }

    const userId = user._id;

    const projects = await Project.find({ projectOwner: userId });

    return res
      .status(200)
      .json(new ApiResponse(200, projects, "Projects created by user"));
  } catch (error) {
    return res.status(400).json(new ApiError(400, "Projects Not found"));
  }
}
async function handleForgotPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(new ApiError(400, "Email not found"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(new ApiError(400, "User not found"));
  }

  const otp = generateOTP();
  user.otp = otp;
  sendOtpToUser(user);
  await user.save();
  return res.status(200).json(new ApiResponse(200, user, "OTP sent"));
}
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}
async function handleVerifyOTP(req, res) {
  const { otp, email } = req.body;
  if (!otp || !email) {
    return res
      .status(400)
      .json(new ApiError(400, "OTP or Email not sent properly"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(new ApiError(400, "User not found"));
  }
  if (String(user.otp) != String(otp)) {
    return res.status(400).json(new ApiError(400, "OTP not verified"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { otpVerified: true }, "User verified"));
}

async function handleResetPassword(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .state(400)
      .json(new ApiError(400, "Email and password not provided"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json(new ApiError(400, "No User found"));
  }
  user.password = password;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Password reset successfull"));
}

async function handleCheckExistingUser(req, res) {
  const { email } = req.query;
  console.log("email", email);
  
  if (!email) {
    return res.status(400).json(new ApiError(400, "Email not provided"));
  }
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    return res.status(400).json(new ApiError(400, "User not found"));
  }
  return res.status(200).json(new ApiResponse(200, user, "User found"));
}
export {
  handleUserRegister,
  handleUserSignin,
  handleUserSignOut,
  handleGetProjects,
  handleForgotPassword,
  handleVerifyOTP,
  handleResetPassword,
  handleCheckExistingUser,
};
