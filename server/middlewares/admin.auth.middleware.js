import {ApiError} from '../utils/ApiError.util.js'
const authorizedToAdmin = (req, res, next) => {
    if(!req.user){
        return res.status(400).json(new ApiError(400, "User is not logged in"));
    }   
    console.log("req.user", req.user);
    if(!req?.user?.userRole && req.user?.userRole === "User"){
        return res.status(400).json(new ApiError(400, "Service not authorized"));
    }
    next();
}

export {authorizedToAdmin};
