import {
  registerUpcyclingIndustry,
  logoutUpcycledIndustry,
  UpcycledIndustryProfile,
} from "../controllers/upcyclingIndustry.controller.js";
import { verifyTok } from "../middlewares/authUpInd.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import Router from "express";

const router = Router();

// unsecure route

router
  .route("/register")
  .post(upload.single("avatar"), registerUpcyclingIndustry);


// secure routes
router.route("/profile").get(verifyTok, UpcycledIndustryProfile);
router.route("/logout").get(verifyTok, logoutUpcycledIndustry);

export default router;
