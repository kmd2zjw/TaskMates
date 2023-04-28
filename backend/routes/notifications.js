import express from "express"
import { getUserNotifications } from "../controllers/notifications.js"

const router = express.Router()

router.get("/getNotifications", getUserNotifications)

export default router