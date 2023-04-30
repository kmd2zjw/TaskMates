import express from "express";
import {createOrg, viewOrgs, getOrg, addUserToGroup, getOrgUsers, makeAdmin} from "../controllers/orgs.js";
const router = express.Router();

router.post("/create", createOrg);
router.get("/", viewOrgs);
router.get("/:id", getOrg);
router.post("/:id/addUserToGroup", addUserToGroup);
router.get("/:id/getUsers", getOrgUsers);
router.post("/:id/makeAdmin", makeAdmin);


export default router