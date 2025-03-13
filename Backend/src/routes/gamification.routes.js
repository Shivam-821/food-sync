import { Router } from "express";
import { getGamification } from "../controllers/gamification.controller.js";

const router = Router()

router.route("/get-gamification-details").get(getGamification);

export default router