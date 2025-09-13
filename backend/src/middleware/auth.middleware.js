import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.model.js"

export const verifyAdmin = asyncHandler(async (req,res, next) => {
    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if(!token){
        console.log("Admin not found");
        return res.
        status(400)
        .json(new ApiResponse(400, {message: "Unauthorized Admin"}, "Unauthorized Admin"))
    }
    
    const decodedToken = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    

    const admin = await Admin.findById(decodedToken?._id).select("-password");

    if(!admin){
        return res.
        status(400)
        .json(new ApiResponse(400, {message: "Unauthorized Admin"}, "Unauthorized Admin"))
    }

    req.admin = admin;
    
    next();
})

export default verifyAdmin;