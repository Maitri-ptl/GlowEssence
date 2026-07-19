import { Router } from "express"
import { createProduct, deleteProduct, getAllproducts, getMyProducts, productbyId, updateProduct } from "../controllers/product.controller.js"
import { verifyProductOwner, verifySeller, verifytoken } from "../middlewares/auth.middleware.js"
import { productValidation } from "../middlewares/validation.js"

const productRouter = Router()

// create product -> only logged-in, approved sellers can create
productRouter.post('/add-product', verifytoken, verifySeller, productValidation, createProduct)

// get all products (public / admin use)
productRouter.get('/get-all-products', getAllproducts)

// get logged-in seller's own products
// IMPORTANT: this must be declared BEFORE '/:id' so 'my-products' isn't treated as an id
productRouter.get('/my-products', verifytoken, verifySeller, getMyProducts)

// product by id
productRouter.get('/:id', productbyId)

// delete product by id -> only the owning seller (or admin) can delete
productRouter.delete('/:id', verifytoken, verifyProductOwner, deleteProduct)

// update product by id -> only the owning seller (or admin) can update
productRouter.patch('/:id', verifytoken, verifyProductOwner, updateProduct)

export default productRouter
