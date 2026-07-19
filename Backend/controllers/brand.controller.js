import Brand from "../models/brand.model.js"

// create brand
export const createBrand = async (req, res) => {
    try {
        const { name } = req.body
        const brand = await Brand.create(req.body)
        res.status(200).json({ success: true, brand })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// get all brands
export const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find()

        if (!brands) {
            return res.status(400).json({ success: false, message: "Brands not found" })
        }

        res.status(200).json({ success: true, brands })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// get brand by id
export const brandById = async (req, res) => {
    try {
        const { id } = req.params
        const brand = await Brand.findById(id)

        if (!brand) {
            return res.status(400).json({ success: false, message: "Brand not found" })
        }

        res.status(200).json({ success: true, brand })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// update brand
export const updateBrand = async (req, res) => {
    try {
        const { id } = req.params

        const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true })

        if (!brand) {
            return res.status(400).json({ success: false, message: "Brand not found" })
        }

        res.status(200).json({ success: true, brand })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// delete brand
export const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params
        
        const brand = await Brand.findByIdAndDelete(id)

        if (!brand) {
            return res.status(400).json({ success: false, message: "Brand not found" })
        }
        res.status(200).json({ success: true, message: "Brand deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}