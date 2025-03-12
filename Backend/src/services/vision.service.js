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
  const labels = data.responses[0]?.labelAnnotations?.map(label => label.description) || [];
  const colors = data.responses[0]?.imagePropertiesAnnotation?.dominantColors?.colors || [];

  console.log("Detected Labels:", labels);

  let quality = "Unknown";
  let expiryDate = "Not determined";

  if (labels.includes("mold") || labels.includes("spoiled")) {
    quality = "Bad";
    expiryDate = "Expired";
  } else if (labels.includes("fresh") || labels.includes("ripe")) {
    quality = "Good";
    expiryDate = "5-7 days from today";
  }

  return {
    labels,
    colors,
    quality,
    expiryDate
  };
};

export { analyzeFoodQuality };
