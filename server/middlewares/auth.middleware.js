import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.util.js'

const verifyJWT = async function(req, res, next){
    try {
        console.log('verifying the user');
        
        const token = req.cookies.accessToken;
        console.log(req.cookies);
        
        if(!token){
            throw new ApiError(400, 'access token not found');
        } 
        
        const decodedToken = await jwt.verify(token, process.env.ACESS_TOKEN_SECRET_KEY);
        
        if(!decodedToken) {
            throw new ApiError(401, "Unable to verify the token");
        }
        console.log(decodedToken);
        
        const id = decodedToken?._id;
    
        const user = await User.findOne({_id: id});
    
        console.log('user', user);

        req.user = user;
        next(); 
    } catch (error) {
        throw new ApiError(400, `Error in verifying the JWT\n ${error.message}`);
        
    }
    

}

export {verifyJWT};