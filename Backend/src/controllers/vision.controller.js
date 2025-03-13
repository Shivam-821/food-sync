import fs from "fs";
import { analyzeImage } from "../services/vision.service.js";

const analyzeImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = req.file.path; // Path to uploaded image

    // Call analyzeImage function to process the image
    const analysisResult = await analyzeImage(imagePath);

    // Delete the image after processing
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
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

export { analyzeImageController };