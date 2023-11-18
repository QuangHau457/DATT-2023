import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { cancelBill, checkBill, getBills, getIdBill, getOneBill, updateBillStatus } from "../controllers/bill";

const router = express.Router();

// GET ALL BILL
router.get("/bill", getBills);
// GET ONE BILL
router.get("/bill/:id", getIdBill);
// GET ONE BILL USER
router.get("/bill/user/:id", authenticate, getOneBill);
// CHECK BILL USER
router.post("/bill/user/add", authenticate, checkBill);
// UPDATE STATUS BILL
router.put("/bill/update/status/:id", updateBillStatus);
// HUỶ ĐƠN HÀNG
router.put("/bill/cancel/status/", authenticate, cancelBill);

export default router;