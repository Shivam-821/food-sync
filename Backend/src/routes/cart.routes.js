import Router from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { verifyUnified } from "../middlewares/authUnified.middlewares.js";
import {
  addToCart,
  getCart,
  removeItemFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/addtocart").get(verifyUnified, addToCart);

router.route("/getcart").get(verifyUnified, getCart);
router.route("/removeitem").get(verifyUnified, removeItemFromCart);

export default router;
