import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/review";

const authHeaders = (token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
});

// Get all reviews for one product
export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (productId, { getState, rejectWithValue }) => {
        try {
            const token = getState().users.token;

            const res = await fetch(`${BASE_URL}/all-reviews/${productId}`, {
                headers: authHeaders(token),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to load reviews");
            }

            return data.reviews;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add a new review for a product
export const addReview = createAsyncThunk(
    "reviews/addReview",
    async ({ productId, rating, comment }, { getState, rejectWithValue }) => {
        try {
            const token = getState().users.token;

            const res = await fetch(`${BASE_URL}/add-review`, {
                method: "POST",
                headers: authHeaders(token),
                body: JSON.stringify({ productId, rating, comment }),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to add review");
            }

            return data.review;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const reviews = createSlice({
    name: "reviews",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearReviewError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addReview.pending, (state) => {
                state.error = null;
            })
            // NOTE: addReview's response only has the reviewer's id, not their
            // name (the backend doesn't populate it on create). So instead of
            // trying to add it to the list here, the page just calls
            // fetchReviews again after this succeeds to get the full,
            // populated list back.
            .addCase(addReview.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearReviewError } = reviews.actions;
export const reviewReducer = reviews.reducer;
