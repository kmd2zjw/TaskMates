import express from "express";
import {createOrg, viewOrgs}
const router = express.Router();

router.post("/", createOrg);
router.get("/", viewOrgs);

export default router