import { Router } from "express";
import { loginUser, registerUser, userDetails } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").get(loginUser)
router.route("/profile").get(userDetails);


export default router;