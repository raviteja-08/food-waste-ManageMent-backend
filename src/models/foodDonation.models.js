import mongoose from "mongoose";

const foodDonationSchema = new mongoose.Schema({
  foodName:{
    type:String,
    required:true
  },
  foodType:{
    type:String,
    required:true
  },
  quantity:{
    type:String,
    required:true 
  },
  expiresIn:{
    type:Number,
    required:true
  },
  address:{
    type:{
      city:String,
      state:String,
      country:String,
      pincode:String
    },
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  donar:{
    type:mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required:true
  },
  isAccepted:{
    type:Boolean,
    default:false
  },
  acceptedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref : "User",
    default:null
  }
  
},
{timestamps:true} )


export const FoodDonation = mongoose.model("FoodDonation",foodDonationSchema); 