import { Router } from "express"
import { categorybyId, createCategory, deleteCategory, getallCategory, updateCategory } from "../controllers/category.controller.js"

const categoryRouter = Router() 

// add category
// category/add-category
categoryRouter.post('/add-category',createCategory)

// get all category
// category/get-all-category
categoryRouter.get('/get-all-category',getallCategory)

// get category by id
// category/:id
categoryRouter.get('/:id',categorybyId)

// update category by id
// category/:id
categoryRouter.patch('/:id',updateCategory)

// delete category by id
// category/:id
categoryRouter.delete('/:id',deleteCategory)

export default categoryRouter