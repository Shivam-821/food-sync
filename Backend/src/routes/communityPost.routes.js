import Router from "express";
import { verifyUnified } from "../middlewares/authUnified.middlewares.js";
import { userName } from '../controllers/communityPost.controller.js'

const router = Router();


router.route("/communityName").get(verifyUnified,userName );

export default router;