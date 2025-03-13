import express from "express";
import multer from "multer";
import { analyzeImageController } from "../controllers/vision.controller.js";

const router = express.Router();
const upload = multer({ dest: "./public/temp" }); // Temp folder for images

router.post("/analyze", upload.single("image"), analyzeImageController);

export default router;