// import fs from "fs";
// import { randomUUID } from "crypto";
// import { fileURLToPath } from "url";
// import path from "path";
import Cart from "../models/cart.model.js";
import productManager from "./ProductManager.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const cartsPath = path.resolve(__dirname, "../data/carts.json");

class CartManager {
    /* // Segunda pre-entrega //

    // constructor(pathfile) {
    //     this.pathfile = pathfile;
    //     if (!fs.existsSync(this.pathfile)) {
    //         fs.writeFileSync(this.pathfile, "[]", "utf-8");
    //     }
    // }
    // async addCart() {
    //     try {
    //         const data = await fs.promises.readFile(this.pathfile, "utf-8");
    //         const carts = JSON.parse(data);
    //         carts.push({ id: randomUUID(), products: [] });
    //         await fs.promises.writeFile(
    //             this.pathfile,
    //             JSON.stringify(carts, null, 2),
    //             "utf-8"
    //         );
    //     } catch (error) {
    //         throw new Error("Error when creating the cart", error);
    //     }
    // }
    // async getCarts() {
    //     try {
    //         const data = await fs.promises.readFile(this.pathfile, "utf-8");
    //         const carts = JSON.parse(data);
    //         return carts;
    //     } catch (error) {
    //         throw new Error("Error when fetching all carts", error);
    //     }
    // }
    // async getCartById(cid) {
    //     try {
    //         const data = await fs.promises.readFile(this.pathfile, "utf-8");
    //         const carts = JSON.parse(data);
    //         const cart = carts.find((carts) => carts.id === cid);
    //         if (!cart) throw new Error();
    //         return cart;
    //     } catch (error) {
    //         `Error when fetching the cart with the ID ${cid}`, error;
    //     }
    // }
    // async addProduct(cid, pid) {
    //     const data = await fs.promises.readFile(this.pathfile, "utf-8");
    //     const carts = JSON.parse(data);
    //     const cIndex = carts.findIndex((prod) => prod.id === cid);

    //     const existingProduct = carts[cIndex].products.find(
    //         (prod) => prod.id === pid
    //     );

    //     if (existingProduct) {
    //         existingProduct.quantity += 1;
    //     } else {
    //         carts[cIndex].products.push({ id: pid, quantity: 1 });
    //     }
    //     await fs.promises.writeFile(
    //         this.pathfile,
    //         JSON.stringify(carts, null, 2),
    //         "utf-8"
    //     );
    // } */

    // Entrega final //
    async addCart() {
        try {
            const cart = new Cart();
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error when creating the cart");
        }
    }
    async getCarts() {
        try {
            const data = await Cart.find().lean();
            return data;
        } catch (error) {
            throw new Error("Error when fetching all carts");
        }
    }
    async getCartById(cid) {
        try {
            const cart = await Cart.findById(cid).populate("products.product");
            if (!cart) throw new Error("That cart doesn't exist");
            return cart;
        } catch (error) {
            throw error;
        }
    }
    // async addProduct(cid, pid, quantity) {
    //     const cart = await Cart.findById(cid);
    //     if (!cart) throw new Error("Cart not found");

    //     const prodIndex = cart.products.findIndex(
    //         (p) => p.product.toString() === pid
    //     );
    //     if (prodIndex !== -1) {
    //         cart.products[prodIndex].quantity += quantity;
    //     } else {
    //         cart.products.push({ product: pid, quantity });
    //     }

    //     await cart.save();
    //     return cart;
    // }
}

const cartManager = new CartManager();

export default cartManager;
