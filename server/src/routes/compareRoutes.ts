import { Router } from "express";
import { compareStores } from "../controllers/compareController";

const router = Router();

router.post("/", compareStores);

export default router;