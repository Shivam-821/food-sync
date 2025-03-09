import {
  loginConsumer,
  registerConsumer,
  logoutConsumer,
  consumerProfile,
} from "../controllers/consumer.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import Router from "express";

const router = Router();

// unsecure route

router
  .route("/register")
  .post(
    upload.single("avatar"),
    registerConsumer
  );

// login
router
  .route("/login")
  .post(loginConsumer);

// // secure routes
router.route("/profile").get(verifyJWT, consumerProfile)
router.route("/logout").get(verifyJWT, logoutConsumer);


export default router;
