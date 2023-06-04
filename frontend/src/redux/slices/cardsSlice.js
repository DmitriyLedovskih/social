import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCardData: [],
  cardData: {}
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsData(state, action) {
      state.allCardData.push(action.payload);
      console.log(state.allCardData);
    },
    setCardData(state, action) {
      state.cardData = action.payload;
    },
  },
});

export const { setCardsData, setCardData } = cardsSlice.actions;

export const selectCards = (state) => state.cards;

export default cardsSlice.reducer;
