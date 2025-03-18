import Router from "express"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { placeOrderFromCart, verifyPayment, markOrderAsCompleted, updateInventoryOnOrderCompletion, getOrderDetails } from "../controllers/order.controller.js"
import { verifyUnified } from "../middlewares/authUnified.middlewares.js";

const router = Router()

router.route("/placeorderfromcart").post(verifyUnified, placeOrderFromCart);
router.route("/verify-payment").post(verifyUnified, verifyPayment);
router.route("/:orderId/completed").put(verifyUnified, markOrderAsCompleted);
router
  .route("/update-inventory")
  .put(verifyUnified, updateInventoryOnOrderCompletion);
router.route("/get-order/:orderId").get(verifyUnified, getOrderDetails);



export default router