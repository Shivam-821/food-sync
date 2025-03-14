// import { io } from "../socket.js";
// import webpush from "web-push";
// import nodemailer from "nodemailer";
// import { Notification } from "../models/notification.model.js";
// import { Subscription } from "../models/subscription.model.js";
// import dotenv from "dotenv";
// dotenv.config();

// webpush.setVapidDetails(
//   "mailto:your_email@example.com",
//   process.env.VAPID_PUBLIC_KEY,
//   process.env.VAPID_PRIVATE_KEY
// );

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// const changePrice = async () => {
//   try {
//     const today = new Date();
//     const fiveDaysFromNow = new Date();
//     fiveDaysFromNow.setDate(today.getDate() + 5);

//     const oneDayFromNow = new Date();
//     oneDayFromNow.setDate(today.getDate() + 1);

//     const itemsForConsumers = await Item.find({
//       expiryDate: { $gte: today, $lte: fiveDaysFromNow },
//       priceModified: false,
//     });

//     const itemsForUpcycling = await Item.find({
//       expiryDate: { $gte: today, $lte: oneDayFromNow },
//       priceModifiedUpcycling: false,
//     });

//     // Handle Consumer Notifications (20% Discount)
//     for (const item of itemsForConsumers) {
//       await Notification.create({
//         userId: item.consumerId,
//         message: `${item.name} is now 20% off! Buy before expiry.`,
//         type: "expiry_discount",
//         link: `/products/${item._id}`,
//       });

//       // Web Push Notification
//       const subscriptions = await Subscription.find({
//         userId: item.consumerId,
//       });
//       subscriptions.forEach(async (sub) => {
//         await webpush.sendNotification(
//           sub,
//           JSON.stringify({
//             title: "Discount Alert!",
//             body: `${item.name} is now 20% off! Buy before expiry.`,
//             icon: "/icons/discount.png",
//             url: `/products/${item._id}`,
//           })
//         );
//       });

//       // Email Notification
//       await transporter.sendMail({
//         from: process.env.MAIL_USER,
//         to: item.consumerEmail,
//         subject: "Discount on Soon-To-Expire Items!",
//         text: `Hurry! ${item.name} is now available at a 20% discount. Buy before it expires!`,
//         html: `<p>Hurry! <strong>${item.name}</strong> is now available at a <strong>20% discount</strong>. <a href="/products/${item._id}">Check it out now</a>!</p>`,
//       });

//       io.emit("expiry_discount", {
//         userId: item.consumerId,
//         message: `${item.name} is now 20% off! Buy before expiry.`,
//         link: `/products/${item._id}`,
//       });
//     }

//     // Handle Upcycling Industry Notifications (40% Discount)
//     for (const item of itemsForUpcycling) {
//       await Notification.create({
//         userId: item.upcyclingIndustryId,
//         message: `${item.name} is available for 40% discount for upcycling!`,
//         type: "upcycling_discount",
//         link: `/products/${item._id}`,
//       });

//       // Web Push Notification
//       const subscriptions = await Subscription.find({
//         userId: item.upcyclingIndustryId,
//       });
//       subscriptions.forEach(async (sub) => {
//         await webpush.sendNotification(
//           sub,
//           JSON.stringify({
//             title: "Upcycling Discount Alert!",
//             body: `${item.name} is now 40% off! Available for upcycling.`,
//             icon: "/icons/upcycling.png",
//             url: `/products/${item._id}`,
//           })
//         );
//       });

//       // Email Notification
//       await transporter.sendMail({
//         from: process.env.MAIL_USER,
//         to: item.upcyclingIndustryEmail,
//         subject: "Discount on Soon-To-Expire Items for Upcycling",
//         text: `${item.name} is now available at a 40% discount for upcycling!`,
//         html: `<p><strong>${item.name}</strong> is now available at a <strong>40% discount</strong> for upcycling. <a href="/products/${item._id}">Check it out now</a>!</p>`,
//       });

//       io.emit("upcycling_discount", {
//         userId: item.upcyclingIndustryId,
//         message: `${item.name} is available for 40% discount for upcycling!`,
//         link: `/products/${item._id}`,
//       });
//     }

//     console.log("Price changes and notifications sent.");
//   } catch (error) {
//     console.error("Error in price change and notification logic:", error);
//   }
// };

// export default changePrice;
