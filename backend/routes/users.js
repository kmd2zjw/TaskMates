import express from "express"
import {addUser} from "../controllers/users.js"

const router = express.Router()

router.get("/test3", addUser)

export default router