import express from "express";
import {createOrg, viewOrgs, getOrg} from "../controllers/orgs.js";
const router = express.Router();

router.post("/create", createOrg);
router.get("/", viewOrgs);
router.get("/:id", getOrg)

export default router