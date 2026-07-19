import { createSlice } from "@reduxjs/toolkit"

const product = createSlice({
    name: "product",
    initialState: {
        products: [],
        isLoading: false,
        error: null
    },
    reducer: {},
})

export const productReducer = product.reducer