import fs from "fs";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.resolve(__dirname, "../data/products.json");

class ProductManager {
    constructor(pathfile) {
        this.pathfile = pathfile;
        if (!fs.existsSync(this.pathfile)) {
            fs.writeFileSync(this.pathfile, "[]", "utf-8");
        }
    }
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.pathfile, "utf-8");
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            throw new Error("Error when fetching all products");
        }
    }
    async getProductById(pid) {
        try {
            const data = await fs.promises.readFile(this.pathfile, "utf-8");
            const products = JSON.parse(data);
            const product = products.find((product) => product.id === pid);
            if (!product) throw new Error("Product doesn't exist.");
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(newProduct) {
        try {
            const data = await fs.promises.readFile(this.pathfile, "utf-8");
            const products = JSON.parse(data);
            console.log(newProduct);
            if (
                newProduct.title === undefined ||
                newProduct.description === undefined ||
                newProduct.code === undefined ||
                newProduct.price === undefined ||
                newProduct.status === undefined ||
                newProduct.stock === undefined ||
                newProduct.category === undefined
            ) {
                throw new Error("All required fields must be provided.");
            }
            const product = {
                id: randomUUID(),
                title: newProduct.title,
                description: newProduct.description,
                code: +newProduct.code,
                price: +newProduct.price,
                status: newProduct.status,
                stock: +newProduct.stock,
                category: newProduct.category,
                thumbnails: Array.isArray(newProduct.thumbnails)
                    ? [...newProduct.thumbnails]
                    : [],
            };
            // const product = { id: randomUUID(), ...newProduct };
            products.push(product);

            await fs.promises.writeFile(
                this.pathfile,
                JSON.stringify(products, null, 2),
                "utf-8"
            );
            return product;
        } catch (error) {
            throw error;
        }
    }
    async deleteProductById(pid) {
        try {
            const data = await fs.promises.readFile(this.pathfile, "utf-8");
            const products = JSON.parse(data);
            const pIndex = products.findIndex((prod) => prod.id === pid);

            if (pIndex === -1)
                throw new Error(`Product with the id:${pid} not found`);
            const deletedProduct = products.splice(pIndex, 1)[0];

            await fs.promises.writeFile(
                this.pathfile,
                JSON.stringify(products, null, 2),
                "utf-8"
            );
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }
    async updateProductById(pid, update) {
        try {
            const data = await fs.promises.readFile(this.pathfile, "utf-8");
            const products = JSON.parse(data);
            const pIndex = products.findIndex((prod) => prod.id === pid);
            if (pIndex === -1)
                throw new Error(`Product with the id:${pid} not found`);

            products[pIndex] = { ...products[pIndex], ...update };
            await fs.promises.writeFile(
                this.pathfile,
                JSON.stringify(products, null, 2),
                "utf-8"
            );

            return products[pIndex];
        } catch (error) {
            throw error;
        }
    }
}

const productManager = new ProductManager(productsPath);

export default productManager;
