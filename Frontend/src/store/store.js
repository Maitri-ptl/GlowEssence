import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../features/products/productSlicer";
import { userReducer } from "../features/users/userSlicer";
import { sellerReducer } from "../features/sellers/sellerSlicer";
import { cartReducer } from "../features/cart/cartSlicer";
import { wishlistReducer } from "../features/wishlist/wishlistSlicer";
import { orderReducer } from "../features/orders/orderSlicer";
import { catalogReducer } from "../features/catalog/catalogSlicer";
import { sellerProductReducer } from "../features/sellerProducts/sellerProductSlicer";
import { adminReducer } from "../features/admin/adminSlicer";
import { reviewReducer } from "../features/reviews/reviewSlicer";

const store = configureStore({
    reducer: {
        users: userReducer,
        product: productReducer,
        seller: sellerReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer,
        catalog: catalogReducer,
        sellerProducts: sellerProductReducer,
        admin: adminReducer,
        reviews: reviewReducer
    }
})

export default store