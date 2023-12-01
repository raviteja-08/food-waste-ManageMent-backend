import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

        postedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type:String
        },
        donationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"FoodDonation"
        },
        isAccepted:{
            type:Boolean,
            default:false
        },
        reciepentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"   
        },
        acceptedByOthers:{
            type:Boolean,
            default:false
        }

},{timestamps:true})

export const Message = mongoose.model("Message",messageSchema);