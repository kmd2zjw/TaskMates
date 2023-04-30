import express from "express";
import {createOrg, viewOrgs, getOrg, addUserToGroup} from "../controllers/orgs.js";
const router = express.Router();

router.post("/create", createOrg);
router.get("/", viewOrgs);
router.get("/:id", getOrg);
router.post("/:id/addUserToGroup", addUserToGroup);

export default router