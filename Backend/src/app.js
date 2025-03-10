import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World');
});

import consumerRoute from "./routes/consumer.routes.js"
import producerRoute from "./routes/producer.routes.js"
import itemRoute from "./routes/items.routes.js"
import upcycleIndRoute from "./routes/upcyclingIndustry.routes.js"
import feedbacdRoute from "./routes/feedback.routes.js"
import cartRoute from "./routes/cart.routes.js"



app.use("/api/v1/consumer", consumerRoute);
app.use("/api/v1/producer", producerRoute)
app.use("/api/v1/items/", itemRoute)
app.use("/api/v1/upcyclingIndustry", upcycleIndRoute)
app.use("/api/v1/feedback", feedbacdRoute)
app.use("/api/v1/cart", cartRoute)


export { app };
