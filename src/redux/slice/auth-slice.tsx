import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('userData')!) || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token",  action.payload)
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userData",  JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token")
      localStorage.removeItem("userData")
    },
  },
});

export const { logout, setToken,setUser } = authSlice.actions;
export default authSlice.reducer;