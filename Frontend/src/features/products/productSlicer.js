import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/product";

// A normal fetch(), but it gives up after a few seconds instead of
// hanging forever if the backend/database is slow or unreachable.
const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timeoutId);
    }
};

// Get every product (used by the Home page and Shop page).
// This endpoint is public - no login needed to browse products.
export const fetchAllProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            // limit=100 so we get everything back in one go - the Shop page
            // already does its own filtering/sorting/pagination on whatever
            // list it gets, so there's no need for the backend to paginate too
            const res = await fetchWithTimeout(`${BASE_URL}/get-all-products?limit=100`);

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to load products");
            }

            return data.products;
        } catch (error) {
            if (error.name === "AbortError") {
                return rejectWithValue("This is taking too long. Please check your connection and try again.");
            }
            return rejectWithValue(error.message);
        }
    }
);

// Get one product by its real database id (used by the Product Details page)
export const fetchProductById = createAsyncThunk(
    "product/fetchProductById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetchWithTimeout(`${BASE_URL}/${id}`);

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Product not found");
            }

            return data.product;
        } catch (error) {
            if (error.name === "AbortError") {
                return rejectWithValue("This is taking too long. Please check your connection and try again.");
            }
            return rejectWithValue(error.message);
        }
    }
);

const product = createSlice({
    name: "product",
    initialState: {
        products: [],
        currentProduct: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.currentProduct = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const productReducer = product.reducer;
