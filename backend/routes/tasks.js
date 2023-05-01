import express from "express"
import {addTask, getUserTasks, getGroupTasks, getUser, acceptTask, getTask, deleteTask, getClaimedTasks, getUnclaimedTasks} from "../controllers/tasks.js"

const router = express.Router()

router.post("/addTask", addTask)
router.get("/getUserTasks", getUserTasks)
router.get("/getUser/:id", getUser)
router.get("/getGroupTasks/:id", getGroupTasks)
router.get("/getTask/:id", getTask)
router.get("/getClaimedTasks/:id", getClaimedTasks)
router.get("/getUnclaimedTasks/:id", getUnclaimedTasks)
router.post("/accept/:id", acceptTask)
router.delete("/:id", deleteTask)

export default router