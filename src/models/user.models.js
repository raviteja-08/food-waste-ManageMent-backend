import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
     user_type:{
       type:String,
       required:true
     },
    username:{
      type:String,
      required:true,
      unique:true, 
      index:true 
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    fullname:{
      type:String,
      required:true
    },
    admin_name:{
      type:String,
      required:true
    },
    phone_number:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true,
      minlength:8,
      maxlength:16
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
    avatar:{
        type:string,//cloudinary
    },
    refreshToken:{
         type:String
    }
    
  }
,{timestamps:true});

UserSchema.pre("save",async function(next){
  if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password,5);
  }
  next()
});

UserSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
       expiresIn:process.env.ACCESS_TOKEN_EXPIRY
     }
    )
}
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
      )
}

export const User = mongoose.model("User",UserSchema);


