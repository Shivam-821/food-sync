import { Router } from "express";
import { getGamification } from "../controllers/gamification.controller.js";
import { verifyUnified } from "../middlewares/authUnified.middlewares.js";

const router = Router()

router.route("/get-gamification-details").get(verifyUnified, getGamification);

export default router