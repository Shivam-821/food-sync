import { Item } from "../models/items.models.js"
import { UpcyclingItem } from "../models/upcyclingItem.models.js";

const moveExpiredItems = async () => {
  try {
    const expiredItems = await Item.find({ expiryDate: { $lt: new Date() } });

    if (expiredItems.length === 0) {
      console.log("No expired items found.");
      return;
    }

    const upcyclingData = expiredItems.map((item) => ({
      item: item._id,
      name: item.name,
      producer: item.producer,
      quantity: item.quantity,
      price: (item.price * 0.6).toFixed(2),
      unit: item.unit,
      method: item.upcyclingOptions?.[0] || "compost",
    }));

    await UpcyclingItem.insertMany(upcyclingData);
    await Item.deleteMany({
      _id: { $in: expiredItems.map((item) => item._id) },
    });

    console.log(`Moved ${expiredItems.length} expired items to UpcyclingItem.`);
  } catch (error) {
    console.error("Error moving expired items:", error);
  }
};

export default moveExpiredItems;
