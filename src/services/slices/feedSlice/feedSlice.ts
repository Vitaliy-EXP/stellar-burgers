import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedOrders: (state, action) => {
      state.orders = action.payload;
    },
    setFeedTotal: (state, action) => {
      state.total = action.payload;
    },
    setFeedTotalToday: (state, action) => {
      state.totalToday = action.payload;
    }
  }
});

export const { setFeedOrders, setFeedTotal, setFeedTotalToday } =
  feedSlice.actions;
export const selectFeedOrders = (state: TOrdersData) => state.orders;
export const selectFeedTotal = (state: TOrdersData) => state.total;
export const selectFeedTotalToday = (state: TOrdersData) => state.totalToday;
export const feedReducer = feedSlice.reducer;
