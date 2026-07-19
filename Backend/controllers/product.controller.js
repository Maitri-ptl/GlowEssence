import Product from "../models/product.model.js"

// create product
// seller field is taken from the logged-in seller's token, NOT from req.body,
// so a seller can never create a product under someone else's name
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create({ ...req.body, seller: req.user.id })
        return res.status(200).json({ success: true, message: "Product added successfully", product })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })

    }
}

// get all products
export const getAllproducts = async (req, res) => {
    try {

        const product = await Product.find().populate('category').populate('brand').populate('seller', '-password')

        if (!product) {
            return res.status(400).json({ message: "Add product" })
        }

        return res.status(200).json({ success: true, product })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}

// get only the logged-in seller's own products
// api/product/my-products
export const getMyProducts = async (req, res) => {
    try {
        const product = await Product.find({ seller: req.user.id }).populate('category').populate('brand')

        return res.status(200).json({ success: true, product })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// get product by id
export const productbyId = async (req, res) => {
    try {

        const { id } = req.params

        const product = await Product.findById(id).populate('category')

        if (!product) {
            return res.status(400).json({ message: "Product not Found" })
        }

        return res.status(200).json({ success: true, product })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// delete product by id
export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(400).json({ message: "Product not Found" })
        }

        return res.status(200).json({message: "Product Deleted", success: true, product })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// update product by id
export const updateProduct = async (req, res) => {
    try {

        const { id } = req.params

        const product = await Product.findByIdAndUpdate(id, req.body, { new: true }).populate('category')

        if (!product) {
            return res.status(400).json({ message: "Product not Found" })
        }

        return res.status(200).json({ success: true, product })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}