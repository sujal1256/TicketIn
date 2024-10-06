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
    throw new ApiError(400, "Values while registering the user are undefined");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Email is not valid");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "Email already registed");
  }

  const user = await User.create({
    username,
    email,
    password,
    userRole,
  });

  const createdUser = await User.findById(user._id).select("-password");

  console.log('User registered successfully');
  
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
      throw new ApiError(400, "Values while signing in the user are undefined");
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not found");
    }
  
    const checkPassword = await user.isPasswordCorrect(password);
  
    if (!checkPassword) {
      throw new ApiError(400, "Incorrect password");
    }
  
    // Make a JWT token and pass it to cookies
    const token = await user.generateAccessToken();
  
    console.log("Signin successfull");
    
    res
      .status(200)
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .json(new ApiResponse(200, user, "Signin successfull"));    
  } catch (error) {
    console.log(`Error occurred while signin In\n`);
    
  }
}

export { handleUserRegister, handleUserSignin };
