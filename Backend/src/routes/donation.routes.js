import { Router } from "express";
import {
  createDonation,
  getAllDonations,
  getUniversalDonations,
} from "../controllers/donation.controller.js";
import { verifyUnified } from "../middlewares/authUnified.middlewares.js";
import {upload } from "../middlewares/multer.middlewares.js"


const router = Router()

router.route("/create-donation").post(
  upload.array("image", 10), 
  verifyUnified,
  createDonation
);



router.route("/get-donations").get(verifyUnified, getAllDonations);
router.route("/get-universal-donations").get(getUniversalDonations);


export default router