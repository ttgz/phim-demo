import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    accessToken: null,
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
        },
        setAuthen: (state, action) => {
            state.isAuthenticated = true;
            state.user =action.payload.user;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})

export const { loginSuccess, setAccessToken, logout, setAuthen } = authSlice.actions;
export default authSlice.reducer;