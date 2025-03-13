import { logoutProducer, producerProfile, registerProducer } from "../controllers/producer.controller.js";
import { verifyToken } from "../middlewares/authProd.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import Router from "express";

const router = Router();

// unsecure route

router
  .route("/register")
  .post(
    upload.single("avatar"),
    registerProducer
  );
  

// // secure routes
router.route("/profile").get(verifyToken, producerProfile);
router.route("/logout").get(verifyToken, logoutProducer);

export default router;
