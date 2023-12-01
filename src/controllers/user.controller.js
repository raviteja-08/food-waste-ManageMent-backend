import { User } from "../models/user.models.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js"
import  jsonWebToken  from "jsonwebtoken"
import bcrypt from "bcrypt"

// remove these functions
const generateToken = (user)=>{

    return jsonWebToken.sign({
        _id:user._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
      )
}
async function checkPassword(password,hashedPass){
    return  bcrypt.compareSync(password,hashedPass);
}

// ends here
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
});

const loginUser = asyncHandler(async(req,res)=>{
       
    const {email,password,userType} = req.body;
    // const data = req.body;
    // console.log(data)
   
    if(
       [email,password,userType].some((field)=>{
          return field?.trim()===""
       })
     ){
        throw new ApiError(400,"all fields are required")
     }
    
    let userData = await User.findOne({email:email});
    if(!userData){
      res.status(400).json({success:false,message:"invalid username or incorrect password"})
    }

    userData = JSON.parse(JSON.stringify(userData));
    console.log(userData.password,email)


    let check = await checkPassword(password,userData.password)
    const token = generateToken(userData);
    console.log( check)
    if(check)
      res.status(200).json({token:token,success:true});
    else
      res.status(400).json({success:false,message:"invalid username or incorrect password"})

})
const userDetails = asyncHandler(async(req,res)=>{
    const {token} = req.body;
    /*
       var decoded = jwt.verify(token, 'shhhhh');
       console.log(decoded.foo)
    */
   // rap this in try catch block
   let decodedData
   try{

      decodedData =  jsonWebToken.verify(token,process.env.ACCESS_TOKEN_SECRET)
   }
   catch(err){
       res.status(404).json({success:false,msg:err})
   }
    
    const userData = await User.findById(decodedData._id).select("-_id -password");

    res.status(200).json(
        new ApiResponse(200,userData,"data of user")
    );
})


export {registerUser,loginUser,userDetails};