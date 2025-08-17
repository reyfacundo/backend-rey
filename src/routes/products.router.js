import express from "express";
import productManager from "../managers/ProductManager.js";
import uploader from "../utils/uploader.js";
import { io } from "../app.js";
import Product from "../models/product.model.js";

const productsRouter = express.Router();

// Segunda pre-entrega //

// productsRouter.get("/", (req,res)=>{
//     try {
//         res.render("product-form");
//     } catch (error){
//         console.log(error);
//         res.status(404);
//     }
// });
// productsRouter.post("/", uploader.single("file") ,async (req, res) => {
//     try {
//         const {title,description,category,code,stock,price,status,file} = req.body;
//         let thumbnailsUrl = "/img/" + file;
//         const newProd =  {title,description,category,code,stock,price,status,thumbnailsUrl}
//         const product = await productManager.addProduct(newProd);
//         io.emit("product", product);
//         res.sendStatus(201);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });
// productsRouter.get("/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const product = await productManager.getProductById(pid);
//         res.json(product);
//     } catch (error) {
//         res.status(404).json({ "Product not found": error.message });
//     }
// });
// productsRouter.put("/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const update = req.body;
//         const product = await productManager.updateProductById(pid, update);
//         res.send("Product updated", product);
//     } catch (error) {
//         res.status(404).json({ "Couldn't update the product": ererror.messageror });
//     }
// });
// productsRouter.delete("/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         await productManager.deleteProductById(pid);
//         res.send("Product deleted successfully");
//     } catch (error) {
//         res.status(404).json({ "Couldn't delete the product": error.message });
//     }
// });

// Entrega Final //

productsRouter.get("/", async (req, res) => {
    try {
        const { limit, page } = req.query;
        const products = await productManager.getProducts(limit, page);
        res.json({ status: "successful", payload: products.docs });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});
productsRouter.post("/", uploader.single("file"), async (req, res) => {
    try {
        console.log(req.body);
        const {
            title,
            description,
            category,
            code,
            stock,
            price,
            status,
            file,
        } = req.body;
        let thumbnailsUrl = "/img/" + file;
        const newProd = {
            title,
            description,
            category,
            code,
            stock,
            price,
            status,
            thumbnails: thumbnailsUrl,
        };
        const product = await productManager.addProduct(newProd);
        io.emit("product", product);
        res.json({status:"Product created"})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
productsRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ "Product not found": error.message });
    }
});
productsRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const update = req.body;
        const product = await productManager.updateProductById(pid, update);
        res.send("Product updated", product);
    } catch (error) {
        res.status(404).json({
            "Couldn't update the product": error.messageror,
        });
    }
});
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        await productManager.deleteProductById(pid);
        res.json({status:"Product deleted successfully"});
    } catch (error) {
        res.status(404).json({ "Couldn't delete the product": error.message });
    }
});

export default productsRouter;
