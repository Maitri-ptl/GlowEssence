import { Router } from "express"
import { categorybyId, createCategory, deleteCategory, getallCategory, updateCategory } from "../controllers/category.controller.js"
import { verifyAdminOrSeller } from "../middlewares/auth.middleware.js"

const categoryRouter = Router()

// NOTE: reading categories is open to any logged-in user (sellers need this
// list to fill in the category dropdown when adding a product). Creating,
// updating, and deleting a category can be done by an admin OR a seller
// (sellers manage their own product catalog here).

// add category (admin or seller)
// category/add-category
categoryRouter.post('/add-category', verifyAdminOrSeller, createCategory)

// get all category
// category/get-all-category
categoryRouter.get('/get-all-category',getallCategory)

// get category by id
// category/:id
categoryRouter.get('/:id',categorybyId)

// update category by id (admin or seller)
// category/:id
categoryRouter.patch('/:id', verifyAdminOrSeller, updateCategory)

// delete category by id (admin or seller)
// category/:id
categoryRouter.delete('/:id', verifyAdminOrSeller, deleteCategory)

export default categoryRouter
