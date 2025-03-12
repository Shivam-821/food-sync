import { analyzeFoodQuality } from "../services/vision.service.js";
import fs from "fs";
import path from "path";

const analyzeImage = async (req, res) => {
  try {
    // Ensure an image is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = req.file.path; // Path to uploaded image

    // Call Vision API for analysis
    const analysisResult = await analyzeFoodQuality(imagePath);

    // Delete the image after analysis
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log("Image deleted successfully.");
      }
    });

    // Send response
    res.status(200).json({
      message: "Image analyzed successfully",
      data: analysisResult,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { analyzeImage };
