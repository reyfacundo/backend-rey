import express from "express";
import productManager from "../managers/ProductManager.js";
import Product from "../models/product.model.js";

const viewsRouter = express.Router();

// const user = {username:"userTest", isAdmin:true};

// const middlewareIsAdmin = (req,res,next) => {
//     if(user.isAdmin){
//         next();
//     }else{
//         res.render("error");
//     }
// }

// Segunda pre-entrega //

// viewsRouter.get("/", async (req, res) => {
//     try {
//         const products = await productManager.getProducts();
//         res.render("home", {products})
//     } catch (error) {
//         res.render("error");
//     }

// });
// viewsRouter.get("/contact", (req, res) => {
//     res.render("contact");
// });
// viewsRouter.get("/realtimeproducts", async (req,res)=>{
//     const products = await productManager.getProducts();
//     res.render("realTimeProducts", {products});
// });

// Entrega final //

viewsRouter.get("/", async (req, res) => {
    try {
        const { limit, page } = req.query;
        const products = await productManager.getProducts(limit, page);
        const links = [];
        for (let i = 1; i <= products.totalPages; i++) {
            links.push({ i, link: `?limit=${limit}&page=${i}` });
        }
        res.render("home", { products: products.docs, links });
    } catch (error) {
        res.render("error");
    }
});
viewsRouter.get("/contact", (req, res) => {
    res.render("contact");
});
viewsRouter.get("/realtimeproducts", async (req, res) => {
    const { limit = 4, page = 1 } = req.query;
    const products = await productManager.getProducts(limit, page);

    const links = [];
    for (let i = 1; i <= products.totalPages; i++) {
        links.push({ i, link: `?limit=${limit}&page=${i}` });
    }
    res.render("realTimeProducts", { products: products.docs, links });
});

export default viewsRouter;
