import {Item} from "../models/items.models.js"

const changePrice = async () => {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);
    const oneDayFromNow = new Date(today);
    oneDayFromNow.setDate(today.getDate() + 1);

    const itemsForConsumers = await Item.find({
      expiryDate: { $gte: today, $lte: sevenDaysFromNow },
      priceModified: false,
    }).populate("producer");

    const itemsForUpcycling = await Item.find({
      expiryDate: { $gte: today, $lte: oneDayFromNow },
      priceModifiedUpcycling: false,
    }).populate("producer");

    const consumerUpdates = itemsForConsumers.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { price: item.price * 0.8, priceModified: true },
      },
    }));

    const upcyclingUpdates = itemsForUpcycling.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { priceModifiedUpcycling: true },
      },
    }));

    // console.log("Price Changed successfully");
  } catch (error) {
    console.error("Error in price change:", error);
  }
};

export default changePrice;
