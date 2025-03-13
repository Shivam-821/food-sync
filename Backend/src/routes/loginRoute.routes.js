import Router from "express"
import { loginUser } from "../utils/CommonLogin.js"

const router = Router()

router.route("/login").post(loginUser)

export default router
