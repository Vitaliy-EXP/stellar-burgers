import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi, getOrderByNumberApi } from '@utils';
import { TOrder } from '@utils-types';
import { RootState } from '@store';

export interface IFeedsState {
  orders: TOrder[];
  isFeedsLoading: boolean;
  order: TOrder | null;
  isOrderLoading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: IFeedsState = {
  orders: [],
  isFeedsLoading: false,
  order: null,
  isOrderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

export const getFeedsThunk = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  'feeds/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedOrderSelector: (state) => state.order,
    isFeedsLoadingSelector: (state) => state.isFeedsLoading,
    ordersSelector: (state) => state.orders,
    isFeedOrderLoadingSelector: (state) => state.isOrderLoading,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isFeedsLoading = false;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка при загрузке заказов';
        state.isFeedsLoading = false;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isOrderLoading = false;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка при получении заказа';
        state.isOrderLoading = false;
      });
  }
});

export const {
  feedOrderSelector,
  isFeedsLoadingSelector,
  ordersSelector,
  isFeedOrderLoadingSelector,
  totalSelector,
  totalTodaySelector
} = feedsSlice.selectors;

export const feedsReducer = feedsSlice.reducer;
