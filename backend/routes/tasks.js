import express from "express"
import {addTask} from "../controllers/tasks.js"

const router = express.Router()

router.post("/addTask", addTask)

export default router