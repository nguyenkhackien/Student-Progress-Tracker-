import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        Account: null,
        Role: null,
        user_name: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isrLogIn
            state.Account = action.payload.Account
            state.Role = action.payload.Role
            state.user_name = action.payload.UserName
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.Account = null
            state.Role = null
            state.user_name = null
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
