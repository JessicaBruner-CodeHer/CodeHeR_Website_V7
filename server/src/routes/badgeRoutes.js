import express from "express";
import { createBadgeRequest } from "../controllers/badgeController.js";

const router = express.Router();
router.post("/", createBadgeRequest);
export default router;
