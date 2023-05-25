import { configureStore } from '@reduxjs/toolkit'
import users from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users
  },
})