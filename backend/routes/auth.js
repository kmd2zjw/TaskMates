import express from "express"
import {addAuth} from "../controllers/auth.js"

const router = express.Router()

router.get("/test2", addAuth)

export default router