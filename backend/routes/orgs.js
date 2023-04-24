import express from "express";
import {createOrg, viewOrgs} from "../controllers/orgs.js";
const router = express.Router();

router.post("/create", createOrg);
router.get("/", viewOrgs);

export default router