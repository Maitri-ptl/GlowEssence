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

// Get All Products
// Search + Filter + Sort + Pagination

export const getAllproducts = async (req, res) => {
    try {

        const { search, category, brand, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query

        const filter = {}

        if (search) {

            filter.$or = [

                // Product name me search karega
                {
                    name: {
                        $regex: search,
                        $options: "i" // i = case insensitive
                    }
                },

                // Description me bhi search karega
                {
                    description: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ]
        }

        if (category) {
            filter.category = category
        }

        if (brand) {
            filter.brand = brand
        }

        if (minPrice || maxPrice) {

            filter.price = {}

            if (minPrice) {
                filter.price.$gte = Number(minPrice)
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice)
            }

        }

        let sortOption = {}

        switch (sort) {

            case "priceAsc":
                sortOption.price = 1
                break

            case "priceDesc":
                sortOption.price = -1
                break

            case "newest":
                sortOption.createdAt = -1
                break

            case "oldest":
                sortOption.createdAt = 1
                break

            case "nameAsc":
                sortOption.name = 1
                break

            case "nameDesc":
                sortOption.name = -1
                break

            default:
                sortOption.createdAt = -1

        }

        const skip = (page - 1) * limit

        const totalProducts = await Product.countDocuments(filter)

        const products = await Product.find(filter)

            .populate("category")

            .populate("brand")

            .populate("seller", "-password")

            .sort(sortOption)

            .skip(skip)

            .limit(Number(limit))

        return res.status(200).json({

            success: true,

            totalProducts,

            currentPage: Number(page),

            totalPages: Math.ceil(totalProducts / limit),

            products

        })

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        })

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

        return res.status(200).json({ message: "Product Deleted", success: true, product })

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