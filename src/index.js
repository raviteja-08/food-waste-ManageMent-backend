// require('dotenv').config({path:"./env"})
import dotenv from "dotenv";
import mongoConnect from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path:'./.env'
})

const port = process.env.PORT||8000;

mongoConnect()
.then((res)=>{
    app.listen(port,()=>{
        console.log(`server is connected on ${port}`);
    })
})
.catch(error=>{
    console.log("not connected to db!!\n",error);
})

