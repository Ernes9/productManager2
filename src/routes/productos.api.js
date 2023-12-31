import { Router } from "express";
import productManager from "../productManager.js";
import { io } from "../app.js";


const productsApiRouter = Router();

productsApiRouter.get('/', async (req, res) => {
    let {limit} = req.query;
    try{
        const productos = await productManager.getProducts()
        if (productos.length === 0) {
            res.status(404).json({ error: 'No se encontraron productos' });
        } else { 
            if(limit){
                res.json(productos.slice(0,parseInt(limit)))
            } else {
                res.json(productos)
            }
        }
    } catch(e){
        res.status(502).json({error: true});    
    }
})

productsApiRouter.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const productById = await productManager.getProductById(id)
        if (!productById){
            res.status(404).json({error: "No se ha encontrado un producto con ese ID"})
        }
        res.json(productById)
    } catch(e){
        res.status(502).json({error: true});    
    }
})

productsApiRouter.post("/", async (req, res) => {
    const body = req.body;
    try{
        const result = await productManager.addProduct(body);
        if (!result){
            res.status(400).json({error: "El code ya existe"})
        }
        res.json(result);
        io.emit("renderProductos", {result})
    } catch(e) {
        console.log(e);
        res.status(502).json({error: true})
    }
})

productsApiRouter.delete("/:id", async (req, res) => {
    const {id} = req.query;
    if (await productManager.getProductById(id)) {
        try {
            await productManager.deleteProduct(id);
            res.json({deleted: true});
            io.emit("renderProductos", productos)
        } catch(e) {
            console.log(e);
            res.status(502).json({error: true});
        }
    }
    else{
        res.status(404).json({error:true})
    }
})

productsApiRouter.put("/:id", async (req, res) => {
    const body = req.body;
    try {
        const result = await productManager.updateProduct(body);
        res.json(result);
        io.emit("renderProductos", productos)
    } catch(e) {
        console.log(e);
        res.status(502).json({error: true})
    }
})

export default productsApiRouter;