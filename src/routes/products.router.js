import express from "express";
import productManager from "../managers/ProductManager.js";

const productsRouter = express.Router();


productsRouter.get("/", (req,res)=>{
    res.render("product-form")
});
productsRouter.post("/", async (req, res) => {
    try {
        const {title,description,category,code,stock,price,status,thumbnails} = req.body;
        await productManager.addProduct({title,description,category,code,stock,price,status,thumbnails});
        res.redirect("/");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default productsRouter;