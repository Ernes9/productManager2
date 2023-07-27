import express from "express";
<<<<<<< HEAD
import handlebars from "express-handlebars"
import productsRouter from "./routes/productos.js";
import cartRouter from "./routes/carts.js"

const app = express();

=======
import handlebars from "express-handlebars";
import productsApiRouter from "./routes/productos.api.js";
import productsRouter from "./routes/productos.js";
import cartRouter from "./routes/carts.js";
import { Server as SocketServer} from "socket.io";
import realTimeProductsRouter from "./routes/realTimeProducts.js";
import productManager from "./productManager.js";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

>>>>>>> 0e42f91 (errors fixed)

// Nos transforma la informacion que venga de los query params para poder utilizarla como objeto
app.use(express.urlencoded({extended: true}));
app.use(express.json());
<<<<<<< HEAD

app.use("/api/productos", productsRouter)
app.use("/api/cart", cartRouter)


app.listen(8080, () => console.log(`Escuchando en el puerto 8080`))
=======
app.use(express.static("./public"))

app.use("/api/productos", productsApiRouter)
app.use("/api/cart", cartRouter)
app.use("/productos", productsRouter)
app.use("/realtimeproducts", realTimeProductsRouter)



const appServer = app.listen(8080, () => console.log(`Escuchando en el puerto 8080`))

export const io = new SocketServer(appServer);

const productos = await productManager.getProducts();

io.on("connection", (socket) => {
    socket.emit("renderProductos", productos)
})
>>>>>>> 0e42f91 (errors fixed)
