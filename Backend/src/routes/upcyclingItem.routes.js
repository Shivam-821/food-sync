import Router from "express"
import { createUpcyclingItem, getUpcyclingItem, getUpcyclingItems, updateUpcyclingItem, deleteUpcyclingItem } from "../controllers/upcyclingItem.controller.js"
import { verifyToken } from "../middlewares/authProd.middlewares.js"

const router = Router()

router.route("/create-upcycling-item").post(verifyToken, createUpcyclingItem)
router.route("/get-upcycled-items").get(getUpcyclingItems)
router.route("/get-upcycled-items/:upitemId").get(getUpcyclingItem)

router.route("/update-upcylcing-item").patch(verifyToken, updateUpcyclingItem)
router.route("/delete-upcycled-item").delete(verifyToken, deleteUpcyclingItem)



export default router