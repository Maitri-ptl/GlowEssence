import { createSlice } from "@reduxjs/toolkit"

const user = createSlice({
    name: "user",
    initialState: {
        users: [],
        currentUser: null,
        isLoading: false,
        error: null
    },
    reducer: {},
})

export const userReducer = user.reducer