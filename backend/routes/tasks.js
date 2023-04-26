import express from "express"
import {addTask, getUserTasks, getGroupTasks} from "../controllers/tasks.js"

const router = express.Router()

router.post("/addTask", addTask)
router.get("/getUserTasks", getUserTasks)
router.get("/getGroupTasks/:id", getGroupTasks)

export default router