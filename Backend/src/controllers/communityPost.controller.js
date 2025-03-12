import { CommunityPost } from "../models/communityPost.models.js";
import { Producer } from "../models/producer.models.js";
import { UpcyclingIndustry } from "../models/upcyclingIndustry.models.js";
import { Consumer } from "../models/consumer.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const userName = asyncHandler(async (req, res) => {
  try {
    let user = null;

    if (req.consumer) {
      user = await Consumer.findById(req.consumer._id);
    } else if (req.producer) {
      user = await Producer.findById(req.producer._id);
    } else if (req.upcycledIndustry) {
      user = await UpcyclingIndustry.findById(req.upcycledIndustry._id);
    }
    if (user===null) return res.status(404).json({ error: "User not found" });

    res.json({ name: user.fullname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  } 
})

export {userName}