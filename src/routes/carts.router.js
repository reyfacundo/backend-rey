import express from "express";
import cartManager from "../managers/CartManager.js";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
    try {
        const cart = await cartManager.addCart();
        res.send("Cart created successfully", cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
cartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});
cartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cartProducts = await cartManager.getCartById(cid);
        res.json({ status: "success", products: cartProducts.products });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        let { quantity } = req.body;
        quantity = parseInt(quantity) || 1;
        const product = await cartManager.addProduct(cid, pid, quantity);
        res.json({ status: "success", payload: product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default cartRouter;
