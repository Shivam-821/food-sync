import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const API_KEY = process.env.GOOGLE_MAPS_API; // Load API key from .env

// Function to analyze an uploaded image
const analyzeImage = async (imagePath) => {
  try {
    // Convert the image to base64
    const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

    const requestBody = {
      requests: [
        {
          image: { content: imageBase64 }, // Sending image as base64
          features: [
            { type: "LABEL_DETECTION" },  // Detects food type (e.g., apple, bread)
            { type: "IMAGE_PROPERTIES" }, // Analyzes color & freshness changes
            { type: "OBJECT_LOCALIZATION" } // Identifies food items in the image
          ]
        }
      ]
    };

    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
    const response = await axios.post(visionApiUrl, requestBody);

    return analyzeFoodQuality(response.data);  // Call food quality function

  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Image analysis failed.");
  }
};

// Function to analyze food quality based on response
const analyzeFoodQuality = (data) => {
  const labels = data.responses[0]?.labelAnnotations?.map(label => label.description.toLowerCase()) || [];
  const colors = data.responses[0]?.imagePropertiesAnnotation?.dominantColors?.colors || [];

  let quality = "Unknown";
  let expiryDate = "Not determined";

  // Define freshness indicators
  const freshIndicators = ["fresh", "ripe", "green", "juicy", "healthy"];
  const badIndicators = ["mold", "rotten", "spoiled", "decayed", "mushy", "stale", "fungus"];

  // Check for bad food labels
  if (labels.some(label => badIndicators.includes(label))) {
    quality = "Bad";
    expiryDate = "Expired";
  } 
  // Check for fresh food labels
  else if (labels.some(label => freshIndicators.includes(label))) {
    quality = "Good";
    expiryDate = "5-7 days from today";
  } 
  // If food is detected but no freshness indicator found
  else if (labels.includes("food") || labels.includes("produce") || labels.includes("vegetable")) {
    quality = "Average";
    expiryDate = "2-3 days from today";
  }

  // Analyze color changes for spoilage detection
  let darkColors = 0;
  let lightColors = 0;

  colors.forEach(colorData => {
    const { red, green, blue } = colorData.color;
    const brightness = (red + green + blue) / 3; // Calculate average brightness

    if (brightness < 60) darkColors++;  // Dark colors suggest spoilage
    if (brightness > 200) lightColors++; // Fresh food is usually bright
  });

  // If there are too many dark colors, assume the food is spoiling
  if (darkColors > lightColors && darkColors > 5) {
    quality = "Bad";
    expiryDate = "Expired";
  }

  return {
    labels,
    colors,
    quality,
    expiryDate
  };
};

export { analyzeImage };
