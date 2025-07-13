import { feedsReducer, getFeedsThunk, getOrderByNumberThunk } from '../feedsSlice';
import { TOrder } from '@utils-types';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Space Burger',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  number: 1,
  ingredients: ['ing1', 'ing2']
};

const mockApiResponse = {
  success: true,
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

const initialState = {
  orders: [],
  isFeedsLoading: false,
  order: null,
  isOrderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

describe('Тест редьюсера feedsSlice', () => {
  describe('getFeedsThunk', () => {
    test('должен установить статус загрузки при pending', () => {
      const state = feedsReducer(
        initialState,
        getFeedsThunk.pending('')
      );
      expect(state.isFeedsLoading).toBe(true);
    });

    test('должен сохранить данные при fulfilled', () => {
      const state = feedsReducer(
        { ...initialState, isFeedsLoading: true },
        getFeedsThunk.fulfilled(mockApiResponse, '')
      );
      expect(state.orders).toEqual(mockApiResponse.orders);
      expect(state.total).toBe(mockApiResponse.total);
      expect(state.totalToday).toBe(mockApiResponse.totalToday);
      expect(state.isFeedsLoading).toBe(false);
    });

    test('должен установить ошибку при rejected', () => {
      const error = new Error('Error');
      const state = feedsReducer(
        { ...initialState, isFeedsLoading: true },
        getFeedsThunk.rejected(error, '')
      );
      expect(state.error).toBe('Error');
      expect(state.isFeedsLoading).toBe(false);
    });
  });

  describe('getOrderByNumberThunk', () => {
    test('должен установить статус загрузки при pending', () => {
      const state = feedsReducer(
        initialState,
        getOrderByNumberThunk.pending('', 1)
      );
      expect(state.isOrderLoading).toBe(true);
    });

    test('должен сохранить заказ при fulfilled', () => {
      const response = { success: true, orders: [mockOrder] };
      const state = feedsReducer(
        { ...initialState, isOrderLoading: true },
        getOrderByNumberThunk.fulfilled(response, '', 1)
      );
      expect(state.order).toEqual(mockOrder);
      expect(state.isOrderLoading).toBe(false);
    });

    test('должен установить ошибку при rejected', () => {
      const error = new Error('Error');
      const state = feedsReducer(
        { ...initialState, isOrderLoading: true },
        getOrderByNumberThunk.rejected(error, '', 1)
      );
      expect(state.error).toBe('Error');
      expect(state.isOrderLoading).toBe(false);
    });
  });
});
