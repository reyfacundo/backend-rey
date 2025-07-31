import express from "express";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res) => {
    try {
        await cartManager.addCart();
        res.send("Cart created successfully");
    } catch (error) {
        res.status(400).json({ "Couldn't create the new cart": error.message });
    }
});
cartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(404).json({ "Couldn't fetch all the carts": error.message });
    }
});
cartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cartProducts = await cartManager.getCartById(cid);
        res.json({ products: cartProducts.products });
    } catch (error) {
        res.status(404).json({ "Cart not found": error.message });
    }
});
cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await cartManager.addProduct(cid, pid);
        res.send("Product added.");
    } catch (error) {
        res.status(400).json({ "Couldn't add the product to the cart": error.message });
    }
});

export default cartRouter