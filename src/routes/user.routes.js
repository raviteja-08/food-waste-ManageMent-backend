import { Router } from "express";
import { loginUser, registerUser, userDetails,getUserDetails } from "../controllers/user.controller.js";
import {getAllDonationsNgo} from "../controllers/foodDonation.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").post(userDetails);

router.route("/getAllDonationsNgo").post(getAllDonationsNgo);
router.route("/profile/:id").post(getUserDetails);


export default router;  