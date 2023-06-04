import { configureStore } from '@reduxjs/toolkit'
import users from './slices/usersSlice';
import cards from './slices/cardsSlice';

export const store = configureStore({
  reducer: {
    users,
    cards
  },
})