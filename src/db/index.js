import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


let mongoConnect = async()=>{
    try{
       const instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(instance.connection.host);
    }
    catch(error){
        console.log("connection error :",error);
        process.exit(1)
    }
}

export default mongoConnect;