import express from "express";
import productManager from "../managers/ProductManager.js";

const viewsRouter = express.Router();


viewsRouter.get("/", async (req, res) => {
    try {
        const user = {username:"userTest", isAdmin:true};
        const products = await productManager.getProducts();
        res.render("home", {products, user})
    } catch (error) {
        res.render("error");
    }

})
viewsRouter.get("/contact", (req, res) => {
    res.render("contact")
})


export default viewsRouter;