import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';


const initialState = {
    email: null,
    token: null,
    id: null
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            localStorage.clear();
            window.location.reload();
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;