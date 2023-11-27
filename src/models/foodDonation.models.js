import mongoose from "mongoose";

const foodDonationSchema = new mongoose.Schema({
  food_name:{
    type:String,
    required:true
  },
  food_type:{
    type:String,
    required:true
  },
  quantity:{
    type:Number,
    required:true 
  },
  duration:{
    type:Number,
    required:true
  },
  postedTime:{
    type:Number,
    default:Date.now()
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
  phone_number:{
    type:String,
    required:true
  },
  donar:{
    type:mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  isAccepted:{
    type:Boolean,
    default:false
  },
  acceptedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
  
},
{timestamps:true} )


export default foodDonationSchema = mongoose.model("food_donation",foodDonationSchema); 