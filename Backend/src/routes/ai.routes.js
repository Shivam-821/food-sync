import Router from "express";
import {getReview} from '../controllers/ai.controller.js'

const router = Router();

router.post("/get-review",getReview)

export default router;