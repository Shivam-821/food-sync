import express from "express";
import multer from "multer";
import { analyzeImage } from "../controllers/vision.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temp folder for images

router.post("/analyze", upload.single("image"), analyzeImage);

export default router;
