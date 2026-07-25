import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/productSlicer";
import { userReducer } from "../features/users/userSlicer";
import { sellerReducer } from "../features/sellers/sellerSlicer";
import { cartReducer } from "../features/cart/cartSlicer";
import { wishlistReducer } from "../features/wishlist/wishlistSlicer";

const store = configureStore({
    reducer: {
        users: userReducer,
        product: productReducer,
        seller: sellerReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
})

export default store