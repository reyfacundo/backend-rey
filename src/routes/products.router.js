import express from "express";
import productManager from "../managers/ProductManager.js";
import uploader from "../utils/uploader.js";
import { io } from "../app.js";

const productsRouter = express.Router();


productsRouter.get("/", (req,res)=>{
    res.render("product-form")
});
productsRouter.post("/", uploader.single("file") ,async (req, res) => {
    try {
        const {title,description,category,code,stock,price,status,file} = req.body;
        let thumbnailsUrl = "/img/" + file;
        await productManager.addProduct({title,description,category,code,stock,price,status,thumbnailsUrl});
        res.redirect("/");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


productsRouter.post("/realtime", uploader.single("file") ,async (req, res) => {
    try {
        const {title,description,category,code,stock,price,status,file} = req.body;
        let thumbnailsUrl = "/img/" + file;
        const newProd =  {title,description,category,code,stock,price,status,thumbnailsUrl} 
        const product = await productManager.addProduct(newProd);
        io.emit("product", product);
        res.sendStatus(201);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



// productsRouter.get("/", async (req, res) => {
//     try {
//         const products = await productManager.getProducts();
//         res.json(products);
//     } catch (error) {
//         res.status(404).json({ "Error when fetching all products": error });
//     }
// });
productsRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ "Product not found": error.message });
    }
});
// productsRouter.post("/", async (req, res) => {
//     try {
//         const productBody = req.body;
//         const newProduct = await productManager.addProduct(productBody);
//         res.status(201).send(`New product "${newProduct.title}" added.`);
//     } catch (error) {
//         res.status(400).json({ "Couldn't add the new product": error });
//     }
// });
productsRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const update = req.body;
        const product = await productManager.updateProductById(pid, update);
        res.send("Product updated", product);
    } catch (error) {
        res.status(404).json({ "Couldn't update the product": ererror.messageror });
    }
});
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProductById(pid);
        res.send("Product deleted successfully");
    } catch (error) {
        res.status(404).json({ "Couldn't delete the product": error.message });
    }
});

export default productsRouter;