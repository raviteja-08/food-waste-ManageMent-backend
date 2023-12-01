import {Router} from "express";
import { createDonation , getAllDonations ,getDonationDetails,acceptDonation,rejectDonation} from "../controllers/foodDonation.controller.js";


const router = Router();

router.route("/create").post(createDonation);
router.route("/getDonations").get(getAllDonations);
router.route("/getDonation/:id").get(getDonationDetails);
router.route("/accept/:id").post(acceptDonation);
router.route("/reject/:id").post(rejectDonation);

export default router;