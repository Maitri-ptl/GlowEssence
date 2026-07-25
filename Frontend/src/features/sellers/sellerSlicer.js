import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/seller";

// Register a new seller (business account)
export const registerSeller = createAsyncThunk(
    "seller/registerSeller",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                // register route can send back either { message } or an array of validation errors
                const message = Array.isArray(data) ? data[0]?.msg : data.message;
                return rejectWithValue(message || "Registration failed");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Login seller
export const loginSeller = createAsyncThunk(
    "seller/loginSeller",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Login failed");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const storedSeller = localStorage.getItem("geSeller");
const storedSellerToken = localStorage.getItem("geSellerToken");

const seller = createSlice({
    name: "seller",
    initialState: {
        currentSeller: storedSeller ? JSON.parse(storedSeller) : null,
        token: storedSellerToken || null,
        isLoading: false,
        error: null,
        message: null,
    },
    reducers: {
        logoutSeller: (state) => {
            state.currentSeller = null;
            state.token = null;
            localStorage.removeItem("geSeller");
            localStorage.removeItem("geSellerToken");
        },
        clearSellerStatus: (state) => {
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerSeller.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(registerSeller.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(registerSeller.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginSeller.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginSeller.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentSeller = {
                    id: action.payload.sellerId,
                    name: action.payload.name,
                };
                state.token = action.payload.token;
                localStorage.setItem("geSeller", JSON.stringify(state.currentSeller));
                localStorage.setItem("geSellerToken", action.payload.token);
            })
            .addCase(loginSeller.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutSeller, clearSellerStatus } = seller.actions;
export const sellerReducer = seller.reducer;
