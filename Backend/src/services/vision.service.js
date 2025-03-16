import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import exp from "constants";

dotenv.config();

const API_KEY = process.env.GOOGLE_MAPS_API;

const analyzeImage = async (imagePath) => {
  try {
    const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

    const requestBody = {
      requests: [
        {
          image: { content: imageBase64 },
          features: [
            { type: "LABEL_DETECTION" },
            { type: "IMAGE_PROPERTIES" },
            { type: "OBJECT_LOCALIZATION" },
            { type: "TEXT_DETECTION" },
          ],
        },
      ],
    };

    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
    const response = await axios.post(visionApiUrl, requestBody);

    return analyzeFoodQuality(response.data);
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Image analysis failed.");
  }
};

const analyzeFoodQuality = (data) => {
  const labels =
    data.responses[0]?.labelAnnotations?.map((label) =>
      label.description.toLowerCase()
    ) || [];
  const colors =
    data.responses[0]?.imagePropertiesAnnotation?.dominantColors?.colors || [];
  const detectedText =
    data.responses[0]?.textAnnotations?.[0]?.description || "";

  let quality = "Unknown";
  let expiryDate = "Not determined";
  let foodType = "Unknown";

  const freshIndicators = [
    "fresh",
    "ripe",
    "green",
    "juicy",
    "crisp",
    "firm",
    "vibrant",
    "glossy",
  ];
  const badIndicators = [
    "mold",
    "rotten",
    "spoiled",
    "decayed",
    "mushy",
    "stale",
    "fungus",
    "soggy",
    "discolored",
  ];
  const fewDaysfood = [
    "vegetable",
    "meat",
    "dairy",
    "milk",
    "yogurt",
    "cheese",
    "eggs",
    "seafood",
    "berries",
    "mushroom",
    "pancake"
  ];
  const nonPerishable = [
    "canned food",
    "dried food",
    "grains",
    "nuts",
    "seeds",
    "oil",
    "vinegar",
    "spices",
    "cereal",
    "tea",
    "coffee",
    "lentils",
    "sugar",
    "pasta",
    "packed"
  ];
  const cookedItems = [
    "chicken",
    "rice",
    "bread",
    "fish",
    "cooked vegetable",
    "soup",
    "juice",
    "curry",
    "stew",
    "roasted",
    "noodles",
    "pastry",
    "meat"
  ];
  const beverages = [
    "milk",
    "juice",
    "wine",
    "beer",
    "soft drink",
    "tea",
    "coffee",
    "liqour",
    "cocktail"
  ];
  const fermentedFoods = [
    "kimchi",
    "yogurt",
    "cheese",
    "pickles",
    "miso",
    "kombucha",
  ];
while(true){
  if (labels.some((label) => badIndicators.includes(label))) {
    quality = "Bad 👎";
    expiryDate = "Expired - Use FoodSync's chatbot for upcycling ideas";
    foodType = "Perishable";
    break;
  }
  if (labels.some((label) => nonPerishable.includes(label))) {
    quality = "Excellent";
    expiryDate = "Long shelf life (months/years)";
    foodType = "Non-Perishable";
    break;
  }
  if (labels.some((label) => freshIndicators.includes(label))) {
      quality = "Good";
      expiryDate = "5-7 days from today";
      break;
  }
  
  if (labels.some((label) => beverages.includes(label))) {
    quality = "Varies";
    expiryDate = "Beverage varies in expiry. Check packaging for expiry details";
    foodType = "Beverage";
    break;
  }
  if (labels.some((label) => fermentedFoods.includes(label))) {
    quality = "Stable - Fermented foods last longer";
    expiryDate = "Weeks to months - Check smell & texture";
    foodType = "Fermented Food";
    break;
  }
  if (labels.some((label) => fewDaysfood.includes(label))) {
      quality = "Average";
      expiryDate = "3-4 days - Consume soon!";
      break;
  }
  if (labels.some((label) => cookedItems.includes(label))) {
    quality = "Consume ASAP";
    expiryDate = "1-2 days - Best eaten fresh";
    foodType = "Cooked";
    break;
  }
  else{
    quality =
      "I am extremly sorry, I am unable to give the quality of this item. FoodSync is trying it\'s best to serve better. We will look into the matter";
    expiryDate = "Not able to Detect";
    break;
  }
}

  let darkColors = 0;
  let lightColors = 0;
  colors.forEach((colorData) => {
    const { red, green, blue } = colorData.color;
    const brightness = (red + green + blue) / 3;
    if (brightness < 80) darkColors++;
    if (brightness > 180) lightColors++;
  });
  if (darkColors > lightColors && darkColors > 5) {
    quality = "Bad";
    expiryDate = "Expired - Discard or upcycle";
    foodType = "Perishable";
  }

  if (
    detectedText.match(
      /(exp|expiry|best before|use by)\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i
    )
  ) {
    expiryDate = `Detected Expiry: ${RegExp.$2}`;
  }

  return {
    labels,
    colors,
    quality,
    expiryDate,
    foodType,
    suggestion: generateSuggestion(quality, foodType),
  };
};

const generateSuggestion = (quality, foodType) => {
  if (quality === "Bad") return "Consider composting or upcycling!";
  if (foodType === "Perishable" && quality === "Good")
    return "Store in fridge to extend freshness!";
  if (foodType === "Cooked") return "Best eaten within a day!";
  if (foodType === "Non-Perishable") return "Store in a cool, dry place!";
  return "Check packaging for expiry details!";
};

export { analyzeImage };
