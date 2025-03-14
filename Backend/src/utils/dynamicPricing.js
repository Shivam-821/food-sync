import { Item } from "../models/items.models.js";

const changePrice = async () => {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const aboutToExpire = await Item.find({
      expiryDate: { $gte: today, $lte: sevenDaysFromNow },
      priceModified: false,
    });

    if (aboutToExpire.length === 0) {
      //console.log("No new items eligible for price change.");
      return;
    }

    // Update the price and set priceModified to true
    await Item.updateMany(
      { _id: { $in: aboutToExpire.map((item) => item._id) } },
      { $mul: { price: 0.8 }, $set: { priceModified: true } }
    );

    //console.log(`Price changed for ${aboutToExpire.length} items.`);
  } catch (error) {
    console.error("Error changing item prices:", error);
  }
};

export default changePrice;
