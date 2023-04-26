import express from "express"
import {addTask, getUserTasks, getGroupTasks, acceptTask} from "../controllers/tasks.js"

const router = express.Router()

router.post("/addTask", addTask)
router.get("/getUserTasks", getUserTasks)
router.get("/getGroupTasks/:id", getGroupTasks)
router.post("/accept", acceptTask)

export default router