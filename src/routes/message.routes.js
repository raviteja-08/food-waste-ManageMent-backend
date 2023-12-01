import { Router } from "express";
import {getMessages} from "../controllers/messages.controller.js"

const app = Router();

app.route("/getMessages").get(getMessages);


export default app;