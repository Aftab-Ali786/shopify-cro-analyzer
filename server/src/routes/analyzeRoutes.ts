import { Router } from "express";
import { analyzeStore } from "../controllers/analyzeController";

const router = Router();

router.post("/analyze", analyzeStore);

export default router;