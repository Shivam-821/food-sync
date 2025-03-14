import Router from "express"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { placeOrderFromCart, verifyPayment, markOrderAsCompleted, updateInventoryOnOrderCompletion, getOrderDetails } from "../controllers/order.controller.js"

const router = Router()

router.route("/placeorderfromcart").post(verifyJWT, placeOrderFromCart)
router.route("/verify-payment").post(verifyJWT, verifyPayment);
router.route("/:orderId/completed").put(verifyJWT, markOrderAsCompleted)
router.route("/ordrId/update-inventory").put(verifyJWT, updateInventoryOnOrderCompletion)
router.route("/get-order/:orderId").get(verifyJWT, getOrderDetails);



export default router