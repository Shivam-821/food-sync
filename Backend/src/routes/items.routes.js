import Router from "express";
import { verifyToken } from "../middlewares/authProd.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/items.controller.js";

const router = Router()

router.route("/create").post(upload.single("avatar"), verifyToken, createItem);

router.route("/update/:itemId").patch(verifyToken, updateItem)

router.route("/delete/:itemId").delete(verifyToken, deleteItem)

router.route("/getitem/:itemId").get(getItemById)

router.route("/getallitem").get(getAllItems)


export default router