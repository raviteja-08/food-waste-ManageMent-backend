import {FoodDonation} from "../models/foodDonation.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";
import jsonwebtoken  from "jsonwebtoken"

const createDonation = asyncHandler(async(req,res)=>{

    let {token,foodName,foodType,quantity,expiresIn,address,phoneNumber} = req.body;
    address.city = address.city.toUpperCase()
    let decodedData
    try{
 
       decodedData =  jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
    }
    catch(err){
        res.status(404).json({success:false,msg:err})
    }
    
    
    const donation = await FoodDonation.create({
          foodName,
          foodType,
          quantity,
          expiresIn,
          address,
          phoneNumber,
          donar:decodedData._id
    })

    let NGOSdata = await User.find({$and : [{'address.city' :{$eq:address.city} },{userType:"NGO"}]});

    NGOSdata = JSON.parse(JSON.stringify(NGOSdata));
    
    const donar = await User.findById(decodedData._id);

    NGOSdata.forEach(async(user)=>{
          await Message.create({
               postedBy:decodedData._id,
               name:donar.fullName,
               donationId:donation._id,
               reciepentId:user._id
            })
    })

    console.log(NGOSdata);
    res.status(200).json(
        new ApiResponse(200,{sentTo:NGOSdata.length},"donation created successfully")
    )
})

const getAllDonations = asyncHandler(async(req,res)=>{

     const {token} = req.body
     console.log(token);
     let decodedData
     try{
  
        decodedData =  jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
     }
     catch(err){
         res.status(404).json({success:false,msg:err})
     }
     const response = await FoodDonation.find({donar:decodedData._id});

     res.status(200).json(
        new ApiResponse(200,response,"your donations")
     )

})
const getAllDonationsNgo = asyncHandler(async(req,res)=>{

     const {token} = req.body
     console.log(token);
     let decodedData
     try{
  
        decodedData =  jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
     }
     catch(err){
         res.status(404).json({success:false,msg:err})
     }
     const response = await Message.find({reciepentId:decodedData._id});

     res.status(200).json(
        new ApiResponse(200,response,"your donations")
     )

})
const getDonationDetails = asyncHandler(async(req,res)=>{
    let {token} = req.body
    let decodedData
    try{
 
       decodedData =  jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
    }
    catch(err){
        res.status(404).json({success:false,msg:err})
    }
    let _id = req.params.id 
    console.log(_id);
    const donation = await FoodDonation.findById(_id);
    res.status(200).json({donation})
})


const acceptDonation = asyncHandler(async(req,res)=>{
      const {token} = req.body
      let decodedData
    try{

        decodedData =  jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
    }
    catch(err){
        res.status(404).json({success:false,msg:err})
    }

    const donationId = req.params.id;

      let donation = await FoodDonation.findById(donationId);
      console.log(donation)
    //await FoodDonation.updateOne({id})
    if(donation.isAccepted===true){
        res.status(200).json(new ApiResponse(200,{message:"already took by someOne"},"you are late"))
    }
    else{

        donation.isAccepted = true
        donation.acceptedBy = decodedData._id;
        await FoodDonation.updateOne({_id:donationId},donation);
   
   
        let msgAccepted = await Message.findOne({$and:[{'reciepentId':decodedData._id},{'donationId':donation._id}]});
        msgAccepted.isAccepted=true;
        await Message.updateOne({$and:[{'reciepentId':decodedData._id},{'donationId':donation._id}]},msgAccepted);
         
        let otherMessages = await Message.find({$and:[{'reciepentId':{$ne :decodedData._id}},{'donationId':donation._id}]})
   
        otherMessages= JSON.parse(JSON.stringify(otherMessages))
        
        otherMessages.forEach(async(msg)=>{
           await Message.updateOne({_id:msg._id},{... msg,acceptedByOthers:true});
        })
   
        donation = await FoodDonation.findById(donationId);
        res.status(200).json(donation);
    }

})

const restDonations = asyncHandler(async(req,res)=>{
    const {token} = req.body
    let decodedData
    try{

        decodedData =  jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
    }
    catch(err){
        res.status(404).json({success:false,msg:err})
    }
    let resp = await  FoodDonation.find({donar:decodedData._id});
    res.status(200).json(
        new ApiResponse(200,resp,"your donations")
    )
})

export {getAllDonations,createDonation,getDonationDetails,acceptDonation,restDonations,getAllDonationsNgo};