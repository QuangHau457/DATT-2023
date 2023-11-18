import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { addToCart, deleteProductCart, get, getCarts, getOneCart } from "../controllers/cart";

const router = express.Router();

router.get("/carts/:id", authenticate, getOneCart);
router.get("/carts/products/:id", authenticate, get);
router.get("/carts", getCarts);
router.post("/carts", authenticate, addToCart);
router.delete("/carts/delete/:id", authenticate, deleteProductCart);


export default router;