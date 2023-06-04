import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constacts';

export const auth = createAsyncThunk(
  "users/loginFetch",
  async (params) => {
    const { userData, url } = params;
    try {
      const res = await fetch(`${BASE_URL}/${url}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Неверные данные!');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk(
  "users/Logout",
  async () => {
    try {
      const res = await fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (res.ok) return res.json();
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk(
  "users/getMeFetch",
  async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUserFetch",
  async (userId) => {
    console.log(userId);
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  loggedIn: false,
  meUserData: {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    avatar: ''
  },
  userData: {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    avatar: ''
  },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedIn(state, actions) {
      state.loggedIn = actions.payload;
    },
    setValue(state, actions) {
      state.userData = actions.payload;
    },
  },
  extraReducers: {
    [auth.pending]: (state) => {
      state.loggedIn = false;
    },
    [auth.fulfilled]: (state, actions) => {
      state.meUserData = actions.payload;
      state.loggedIn = true;
    },
    [auth.rejected]: (state) => {
      state.loggedIn = false;
    },
    [getMe.pending]: (state) => {
      state.loggedIn = false;
    },
    [getMe.fulfilled]: (state, actions) => {
      state.meUserData = actions.payload;
      state.loggedIn = true;
    },
    [getMe.rejected]: (state) => {
      state.loggedIn = false;
    },
    [logout.fulfilled]: (state) => {
      state.loggedIn = false;
    },
    [getUser.pending]: (state) => {
      state.userData = {};
    },
    [getUser.fulfilled]: (state, actions) => {
      state.userData = actions.payload;
    },
    [getUser.rejected]: (state) => {
      state.userData = {};
    },
  }
});

export const { setLoggedIn, setValue } = usersSlice.actions;

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
