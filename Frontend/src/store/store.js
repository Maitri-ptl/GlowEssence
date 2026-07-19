import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/productSlicer";
import { userReducer } from "../features/users/userSlicer";

const store = configureStore({
    reducer: {
        users: userReducer,
        product: productReducer
    }
})

export default store