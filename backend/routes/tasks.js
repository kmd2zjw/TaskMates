import express from "express"
import {addTask, getUserTasks, getGroupTasks, getUser, acceptTask, getTask, deleteTask, getClaimedTasks, getUnclaimedTasks, getAllGroupTasks} from "../controllers/tasks.js"

const router = express.Router()

router.post("/addTask", addTask)
router.get("/getUserTasks", getUserTasks)
router.put("/getUser", getUser)
router.get("/getGroupTasks/:id", getGroupTasks)
router.get("/getTask/:id", getTask)
router.get("/getClaimedTasks/:id", getClaimedTasks)
router.get("/getUnclaimedTasks/:id", getUnclaimedTasks)
router.post("/accept/:id", acceptTask)
router.delete("/:id", deleteTask)
router.get("/getAllGroupTasks/:id", getAllGroupTasks)

export default router