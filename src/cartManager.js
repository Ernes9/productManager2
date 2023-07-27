import { triggerAsyncId } from "async_hooks";
import fs from "fs";
import productManager from "./productManager.js";
import { randomUUID } from "crypto";

class CartManager{
    constructor(){
        this.path = './db/carts.json';
    }

    async #saveCart(cart) {
        await fs.promises.writeFile(this.path, JSON.stringify(cart));
        return cart;
    }

    async getCarts() {
        try{
            const file = await fs.promises.readFile(this.path, "utf8");
            const carts = JSON.parse(file)
            return carts;
        } catch{
            return [];
        }

    }

    async addCart() {
        try{
            const carts = await this.getCarts();
<<<<<<< HEAD
            const cart = {id: randomUUID, products:[]};
=======
            const cart = {id: randomUUID(), products:[]};
>>>>>>> 0e42f91 (errors fixed)
            carts.push(cart);
            await this.#saveCart(carts);
            return cart
        } catch(e) {
            console.log(e)
        }
    }

    async getCartById(id){
        try{
            const carts = await this.getCarts();
            const foundCart = carts.find((cart) => cart.id == id);
            if (foundCart){
                return foundCart;
            } else{
                console.log('Not Found');
            };
        } catch(e){
            console.log(e);
        }
    };

    async addProductInCart(cartId, prodId) {
        try {
            const carts = await this.getCarts();
            const prods = await productManager.getProducts();
            const foundCartIndex = carts.findIndex((cart) => cart.id == cartId);
            const foundProduct = prods.find((prod) => prod.id == prodId);
            if (!foundProduct){
                console.log("El producto no existe")
                return;
            } else {
<<<<<<< HEAD
                if (Object.keys(carts[foundCartIndex].products)) {
                    const productIndex = carts[foundCartIndex].products.findIndex((prod) => prod.id == prodId);
                    if (productIndex !== -1) {
                    carts[foundCartIndex].products[productIndex].quantity++;
                    } else {
                    carts[foundCartIndex].products.push({ id: prodId, quantity: 1 });
                    }
                } else {
                carts[foundCartIndex].products = [{ id: prodId, quantity: 1 }];
=======
                const productIndex = carts[foundCartIndex].products.findIndex((prod) => prod.id == prodId);
                if (productIndex !== -1) {
                carts[foundCartIndex].products[productIndex].quantity++;
                } else {
                carts[foundCartIndex].products.push({ id: prodId, quantity: 1 });
>>>>>>> 0e42f91 (errors fixed)
                }
                await this.#saveCart(carts);
                return carts[foundCartIndex]
            }
        } catch (e) {
            console.log(e);
        }
    }
}

const cartManager = new CartManager()

export default cartManager;

