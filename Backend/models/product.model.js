import mongoose, { Schema } from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    description : {
        type: String,
        required: true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product