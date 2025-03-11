import Router from "express"
import { verifyUnified } from "../middlewares/authUnified.middlewares.js";
import {
  createFeedback,
  deleteFeedback,
  updateFeedback,
  getAllFeedback,
} from "../controllers/feedback.controller.js";

const router = Router()

// router
router.route("/givefeedback").post(verifyUnified, createFeedback)
router.route("/updatefeedback/:feedbackId").patch(verifyUnified, updateFeedback)
router.route("/deletefeedback/:feedbackId").delete(verifyUnified, deleteFeedback)
router.route("/getallfeedback").get(getAllFeedback)

export default router