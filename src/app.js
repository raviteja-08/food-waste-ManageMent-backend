import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();

// middlewares configuration
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes

import userRouter from "./routes/user.routes.js"
import donationRouter from "./routes/foodDonation.routes.js"
import messageRouter from "./routes/message.routes.js"
// routes declaration
app.use("/api/users",userRouter);
app.use("/api/donation",donationRouter);
app.use("/api/messages",messageRouter);


export  {app};