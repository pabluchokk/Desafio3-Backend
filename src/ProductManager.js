import { promises as fs } from "fs";

class ProductManager {
    constructor() {
        this.path = './products.json'
        this.products = []
    }

    addProduct = async (id ,title, description, price, image, code, stock) => {
        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            image,
            code,
            stock
        }

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    readProduct = async () => {
        try {
            let ans = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(ans)
        } catch (error) {
            console.log('Error al leer el archivo', error.message)
            return [];
        }
    }

    getProducts = async () => {
        let ans2 = await this.readProduct();
        return console.log(ans2)
    }

    real(id, productList){
        return productList.find((producto) => producto.id === id)
    }

    getProductById = async (id) =>{
        let products = await this.readProduct();
        let product = this.real(id, products)

        if (!product) {
            console.log('Error al obtener el ID')
        } else {
            console.log(product)
        }
    }

    deleteByID = async (id) => {
        let ans3 =  await this.readProduct();
        let filter = ans3.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(filter))
        console.log('Borrar producto')
    }

    upgrade = async ({id, ...product}) => {
        await this.deleteByID(id);
        let pOld = await this.readProduct();
        let pMod = [{...product, id}, pOld]
        await fs.writeFile(this.path, JSON.stringify(pMod))
    }
}

// const manager = new ProductManager

// manager.addProduct(1,'Producto 1', 'Descripcion de producto 1', 400, './img/001.jpg', 101, 14)
// manager.addProduct(2,'Producto 2', 'Descripcion de producto 2', 800, './img/002.jpg', 704, 8) 
// manager.addProduct(3,'Producto 3', 'Descripcion de producto 3', 250, './img/003.jpg', 901, 13)

// manager.getProducts()
// manager.getProductById(2)
// manager.deleteByID(3)

// manager.upgrade({
//     id: 1,
//     title: 'Producto mejor',
//     description: 'super producto',
//     price: 2000,
//     image: './img/101.jpg',
//     code: 130814,
//     stock: 40
// })

export default ProductManager;