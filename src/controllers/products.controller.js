import Product from "../models/Product"

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body

    const newProduct = new Product({ name, category, price, imgURL })

    try{
        const productSaved = await newProduct.save()
        res.status(201).json(productSaved)
    }catch(ex){
        res.status(404).json("Error on creating")
    }
}

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.json(products)
    }catch(ex){
        res.status(404).json("Error on searching")
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.json(product)
    }catch(ex){
        res.status(404).json("Error on searching by id")
    }
}

export const updateProductById = async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.json(updatedProduct)
    }catch(ex){
        res.status(404).json("Error on updating by id")
    }
}

export const deleteProductById = async (req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.json(deletedProduct)
    }catch(ex){
        res.status(404).json("Error on deleting by id")
    }
}