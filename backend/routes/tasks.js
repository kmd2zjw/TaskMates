import express from "express"
import {addTask} from "../controllers/tasks.js"

const router = express.Router()

router.get("/test1", addTask)

export default router