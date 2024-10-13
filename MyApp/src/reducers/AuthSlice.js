import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        Account: null,
        Role: null,
        User_name: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLogIn
            state.Account = action.payload.Account
            state.Role = action.payload.Role
            state.User_name = action.payload.UserName
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.Account = null
            state.Role = null
            state.User_name = null
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
