import express from "express";

import { checkPermission } from "../middlewares/checkPermission";
import { getAll, remove, update } from "../controllers/user";

const router = express.Router();
router.get("/user", getAll);
router.delete("/user/:id",checkPermission,remove);
router.put("/user/:id",checkPermission, update);

export default router;