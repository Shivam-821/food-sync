import { createngo, ngoProfile, logoutNgo, requestDonation } from "../controllers/ngo.controller.js";
import { verifyNgo } from "../middlewares/authNgo.middlewares.js";
import Router from "express"

const router = Router()
router.route("/registerngo").post(createngo)

router.route("/getngoprofile").get(verifyNgo, ngoProfile);

router.route("/logoutngo").get(verifyNgo, logoutNgo)

router.route("/requestdonation").get(verifyNgo, requestDonation)



export default router