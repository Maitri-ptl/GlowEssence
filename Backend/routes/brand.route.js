import { Router } from "express"
import { brandById, createBrand, deleteBrand, getAllBrands, updateBrand } from "../controllers/brand.controller.js"
import { verifyAdminOrSeller } from "../middlewares/auth.middleware.js"

const brandRouter = Router()

// NOTE: reading brands is open to any logged-in user (sellers need this
// list to fill in the brand dropdown when adding a product). Creating,
// updating, and deleting a brand can be done by an admin OR a seller
// (sellers manage their own product catalog here).

// add brand (admin or seller)
// brand/add-brand
brandRouter.post('/add-brand', verifyAdminOrSeller, createBrand)

// get all brands
// brand/get-all-brands
brandRouter.get('/get-all-brands',getAllBrands)

// get brand by id
// brand/:id
brandRouter.get('/:id',brandById)

// update brand by id (admin or seller)
// brand/:id
brandRouter.patch('/:id', verifyAdminOrSeller, updateBrand)

// delete brand by id (admin or seller)
// brand/:id
brandRouter.delete('/:id', verifyAdminOrSeller, deleteBrand)

// export brand router
export default brandRouter
