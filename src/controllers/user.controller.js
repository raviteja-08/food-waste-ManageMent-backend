import { User } from "../models/user.models.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js"

const registerUser = asyncHandler(async(req,res)=>{
     

    // get details
    const {fullName,email,userType,adminName,phoneNumber,password,address}=req.body;
    
    if(
        [fullName,email,userType,adminName,phoneNumber,password].some((field)=>{
          return field?.trim() === ""
        })
      ){
        throw new ApiError(400,"all fields are required")
      }
    
    const existedUser = await User.findOne({email});
    if(existedUser){
        throw new ApiError(409,"user with email already exist");
    }
    // req.files.......
    const user = await User.create({
        fullName,
        email,
        userType,
        adminName,
        phoneNumber,
        password,
        address
    })
    const createdUser = await User.findById(user?._id).select(
        "-password -refreshToken"
    )
    if(! createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered")
    )
})

export {registerUser}