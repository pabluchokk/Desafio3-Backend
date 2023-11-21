import express from 'express';
import ProductManager from './ProductManager.js';

const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extended: true }))

const manager = new ProductManager();
const readProd = manager.readProduct();

app.get('/products', async (req,res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) {
        return res.send(await readProd)
    }
    let allProducts = await readProd;
    let productLimit = allProducts.slice(0, limit)

    res.send(productLimit)
})

app.get('/products/:id', async (req,res) =>{
    let id = parseInt(req.params.id);
    let allProducts = await readProd()
    let productById = allProducts.find(product => product.id === id)
    res.send(productById)
})

const server = app.listen(PORT, () =>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})