import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  userData: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setValue(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { setLoggedIn, setValue } = usersSlice.actions;

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
