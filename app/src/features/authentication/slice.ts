import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthenticationState {
    token: string | null,
}

const initialState: AuthenticationState = {
    token: null,
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login: function (state, action: PayloadAction<string>) {
            state.token = action.payload;
        },

        logout: function(state) {
            state.token = null;
        },
    }
})

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;