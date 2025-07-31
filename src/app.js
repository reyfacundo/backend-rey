import express from "express";
import http from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";

const app = express();
const server = http.createServer(app);

export const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);


io.on("connection", (socket)=>{
    socket.on("product", (data)=>{console.log(data)});
});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});