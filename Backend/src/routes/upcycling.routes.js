import Router from "express"
import { verifyTok } from "../middlewares/authUpInd.middlewares.js"
import {placeUpcyclingOrderFromCart, verifyUpcyclingPayment, getUpcyclingOrder,markOrderAsCompleted} from "../controllers/upcyclingOrder.controller.js"

const router = Router()

router.route('/placeOrder').post(verifyTok, placeUpcyclingOrderFromCart)
router.route('/verifyPayment').post(verifyTok, verifyUpcyclingPayment)
router.route('/:orderId/completed').put(verifyTok, markOrderAsCompleted)
router.route('/getupcycleOrder').get(verifyTok, getUpcyclingOrder)



export default router
