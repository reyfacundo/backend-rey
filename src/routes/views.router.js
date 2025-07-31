import express from "express";
import productManager from "../managers/ProductManager.js";

const viewsRouter = express.Router();

// const user = {username:"userTest", isAdmin:true};

// const middlewareIsAdmin = (req,res,next) => {
//     if(user.isAdmin){
//         next();
//     }else{
//         res.render("error");
//     }
// }

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", {products, user})
    } catch (error) {
        res.render("error");
    }

})
viewsRouter.get("/contact", (req, res) => {
    res.render("contact");
})
viewsRouter.get("/realtimeproducts", async (req,res)=>{
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {products});
})

export default viewsRouter;