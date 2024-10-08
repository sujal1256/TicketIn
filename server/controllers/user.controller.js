import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

async function handleUserRegister(req, res) {
  let { username, email, password, userRole } = req.body;
  username = username?.trim();
  email = email?.trim();
  password = password?.trim();
  userRole = userRole?.trim();

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
    userRole,
  });

  const createdUser = await User.findById(user._id).select("-password");

  console.log("User registered successfully");

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
        .status(400)
        .json(
          new ApiError(401, "Values while signing in the user are undefined")
        );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json(new ApiError(401, "User not found"));
    }

    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
      return res.status(400).json(new ApiError(401, "Incorrect Password"));
    }

    // Make a JWT token and pass it to cookies
    const token = await user.generateAccessToken();

    // we donot want to send password to the frontend

    const userToSend = user.toObject();
    delete userToSend.password;

    console.log("Signin successfull");

    res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
      })
      .json(new ApiResponse(200, userToSend, "Signin successfull"));
  } catch (error) {
    console.log(`Error occurred while signin In\n`);
  }
}

export { handleUserRegister, handleUserSignin };
