import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/wishlist";

const authHeaders = (token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
});

// Get logged in user's wishlist
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().users.token;

            const res = await fetch(`${BASE_URL}/get-wishlist`, {
                headers: authHeaders(token),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to load wishlist");
            }

            return data.wishlist;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Remove a product from the wishlist
export const removeWishlistItem = createAsyncThunk(
    "wishlist/removeWishlistItem",
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = getState().users.token;

            const res = await fetch(`${BASE_URL}/remove/${id}`, {
                method: "DELETE",
                headers: authHeaders(token),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to remove item");
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const wishlist = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(removeWishlistItem.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item._id !== action.payload
                );
            });
    },
});

export const wishlistReducer = wishlist.reducer;
