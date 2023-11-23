// require('dotenv').config({path:"./env"})
import dotenv from "dotenv";
import mongoConnect from "./db/index.js";

dotenv.config({
    path:'./env'
})
mongoConnect();

