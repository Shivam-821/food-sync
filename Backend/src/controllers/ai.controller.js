import generateContent from '../services/ai.service.js'

const getReview = async (req,res)=>{
  try{
    const prompt = req.body.promt;

    if(!prompt){
      return res.status(400).send("promt is requireed");
    }

    const aiResponse = await generateContent(prompt); // Get AI response as text

    // **Format the AI response as structured JSON**
    const structuredResponse = {
      heading: "AI Response",
      points: aiResponse.split("\n").filter((line) => line.trim() !== ""), // Split response into bullet points
    };

    res.json(structuredResponse);
  } catch (error) {
    console.error("AI API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {getReview}