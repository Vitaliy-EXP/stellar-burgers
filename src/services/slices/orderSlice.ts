import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@utils';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

interface TOrderState {
  orderData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
  userOrders: TOrder[];
}

const initialState: TOrderState = {
  orderData: null,
  orderRequest: false,
  error: null,
  userOrders: []
};
//Загружаем заказы пользователя
export const fetchUserOrdersThunk = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, thunkAPI) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//Создаем заказ
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[], thunkAPI) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.orderData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload as string;
        state.orderRequest = false;
      })
      .addCase(fetchUserOrdersThunk.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrdersThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { clearOrderData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export const orderSelector = (state: RootState) => state.order;
export const userOrdersSelector = (state: RootState) => state.order.userOrders;
