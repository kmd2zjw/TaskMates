import express from "express"
import {addTask, getUserTasks, getGroupTasks, acceptTask, getTask, deleteTask} from "../controllers/tasks.js"

const router = express.Router()

router.post("/addTask", addTask)
router.get("/getUserTasks", getUserTasks)
router.get("/getGroupTasks/:id", getGroupTasks)
router.get("/getTask/:id", getTask)
router.post("/accept/:id", acceptTask)
router.delete("/:id", deleteTask)

export default router