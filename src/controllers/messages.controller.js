import { Message } from "../models/message.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import  jsonWebToken  from "jsonwebtoken";

const getMessages=asyncHandler(async(req,res)=>{
      const {token}  = req.body;
      let decodedData
      try{
   
         decodedData =  jsonWebToken.verify(token,process.env.ACCESS_TOKEN_SECRET)
      }
      catch(err){
          res.status(404).json({success:false,msg:err})
      }
      const response = await Message.find({'reciepentId':decodedData._id});
      res.status(200).json(new ApiResponse(200,response,"your messages"));
})


export {getMessages};