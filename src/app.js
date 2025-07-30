import express from "express";
import productManager from "./managers/ProductManager.js";
import cartManager from "./managers/CartManager.js";
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter)

// app.get("/api/products", async (req, res) => {
//     try {
//         const products = await productManager.getProducts();
//         res.json(products);
//     } catch (error) {
//         res.status(404).json({ "Error when fetching all products": error });
//     }
// });
// app.get("/api/products/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const product = await productManager.getProductById(pid);
//         res.json(product);
//     } catch (error) {
//         res.status(404).json({ "Product not found": error.message });
//     }
// });
// app.post("/api/products/", async (req, res) => {
//     try {
//         const productBody = req.body;
//         const newProduct = await productManager.addProduct(productBody);
//         res.status(201).send(`New product "${newProduct.title}" added.`);
//     } catch (error) {
//         res.status(400).json({ "Couldn't add the new product": error });
//     }
// });
// app.put("/api/products/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const update = req.body;
//         const product = await productManager.updateProductById(pid, update);
//         res.send("Product updated", product);
//     } catch (error) {
//         res.status(404).json({ "Couldn't update the product": error });
//     }
// });
// app.delete("/api/products/:pid", async (req, res) => {
//     try {
//         const { pid } = req.params;
//         await productManager.deleteProductById(pid);
//         res.send("Product deleted successfully");
//     } catch (error) {
//         res.status(404).json({ "Couldn't delete the product": error });
//     }
// });
// app.post("/api/carts", async (req, res) => {
//     try {
//         await cartManager.addCart();
//         res.send("Cart created successfully");
//     } catch (error) {
//         res.status(400).json({ "Couldn't create the new cart": error });
//     }
// });
// app.get("/api/carts", async (req, res) => {
//     try {
//         const carts = await cartManager.getCarts();
//         res.json(carts);
//     } catch (error) {
//         res.status(404).json({ "Couldn't fetch all the carts": error });
//     }
// });
// app.get("/api/carts/:cid", async (req, res) => {
//     try {
//         const { cid } = req.params;
//         const cartProducts = await cartManager.getCartById(cid);
//         res.json({ products: cartProducts.products });
//     } catch (error) {
//         res.status(404).json({ "Cart not found": error.message });
//     }
// });
// app.post("/api/carts/:cid/product/:pid", async (req, res) => {
//     try {
//         const { cid, pid } = req.params;
//         await cartManager.addProduct(cid, pid);
//         res.send("Product added.");
//     } catch (error) {
//         res.status(400).json({ "Couldn't add the product to the cart": error });
//     }
// });

app.listen(8080, () => {
    console.log("Server running on port 8080");
});