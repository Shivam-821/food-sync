import Router from "express"
import { verifyUnified } from "../middlewares/authUnified.middlewares.js";
import { createFeedback, deleteFeedback, updateFeedback } from "../controllers/feedback.controller.js"

const router = Router()

// router
router.route("/givefeedback").post(verifyUnified, createFeedback)
router.route("/updatefeedback/:feedbackId").patch(verifyUnified, updateFeedback)
router.route("/deletefeedback/:feedbackId").delete(verifyUnified, deleteFeedback)




export default router