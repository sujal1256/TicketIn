import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";

export async function createUserAfterSignup(req, res){
    let {username, email, password, userRole} = req.body;
    username = username?.trim();
    email = email?.trim();
    password = password?.trim();
    userRole = userRole?.trim();
    
    if([username, email, password].some(e => {e == undefined})){
        throw new ApiError(400, 'Values while create the user are undefined');
    }

    if(!email.includes('@')){
        throw new ApiError(400, 'Email is not valid');
    }

    const existedUser = await User.findOne({email});    
    if(existedUser){
        throw new ApiError(400, "Email already registed")
    }
 
    const user = await User.create({
        username,
        email,
        password,
        userRole 
    });
    
    const createdUser = await User.findById(user._id).select('-password')

    res.status(200).json(new ApiResponse(200, createdUser, "User created successfully"));   
 

}