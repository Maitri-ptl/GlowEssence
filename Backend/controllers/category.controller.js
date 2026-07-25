import Category from "../models/category.model.js"

// create category
export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(200).json({ success: true, category })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })

    }
}

// get all category
export const getallCategory = async (req, res) => {
    try {
        const category = await Category.find()

        if (!category) {
            return res.status(400).json({ message: "Categories not found" })
        }

        return res.status(200).json({ success: true, category })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

// get category by id
export const categorybyId = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findById(id)

        if (!category) {
            return res.status(400).json({ message: "Category not found" })
        }

        return res.status(200).json({ success: true, category })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

// update category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findByIdAndUpdate(id, req.body, { new: true })

        if (!category) {
            return res.status(400).json({ message: "Category not found" })
        }

        return res.status(200).json({ success: true, category })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

// delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findByIdAndDelete(id)

        if (!category) {
            return res.status(400).json({ message: "Category not found" })
        }

        return res.status(200).json({ success: true, category })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

