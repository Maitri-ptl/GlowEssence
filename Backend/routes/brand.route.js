import { Router } from "express"
import { brandById, createBrand, deleteBrand, getAllBrands, updateBrand } from "../controllers/brand.controller.js"

const brandRouter = Router()

// add brand
// brand/add-brand
brandRouter.post('/add-brand',createBrand)

// get all brands
// brand/get-all-brands
brandRouter.get('/get-all-brands',getAllBrands)

// get brand by id
// brand/:id
brandRouter.get('/:id',brandById)

// update brand by id
// brand/:id
brandRouter.patch('/:id',updateBrand)

// delete brand by id
// brand/:id
brandRouter.delete('/:id',deleteBrand)

// export brand router
export default brandRouter
