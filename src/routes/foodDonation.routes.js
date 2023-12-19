import {Router} from "express";
import { createDonation , getAllDonations ,getDonationDetails,acceptDonation,restDonations} from "../controllers/foodDonation.controller.js";


const router = Router();

router.route("/create").post(createDonation);
router.route("/getDonations").get(getAllDonations);


router.route("/getDonation/:id").post(getDonationDetails);


router.route("/accept/:id").post(acceptDonation);
router.route("/getAllDonationsRest").post(restDonations);

export default router;