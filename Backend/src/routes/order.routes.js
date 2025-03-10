import Router from "express"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { getOrder, placeOrderFromCart, verifyPayment } from "../controllers/order.controller.js"

const router = Router()

router.route("/placeorderfromcart").post(verifyJWT, placeOrderFromCart)
router.route("/verify-payment").post(verifyJWT, verifyPayment);
router.route("/get-order/:orderId").get(verifyJWT, getOrder);



export default router