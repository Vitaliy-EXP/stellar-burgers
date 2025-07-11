import { orderReducer, createOrder, fetchUserOrdersThunk, clearOrderData } from '../orderSlice';
import { TOrder } from '@utils-types';

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

const mockOrder: TOrder = {
  _id: '123',
  status: 'done',
  name: 'Space Burger',
  createdAt: '2025-06-08T12:00:00.000Z',
  updatedAt: '2025-06-08T12:01:00.000Z',
  number: 12345,
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093f']
};

const initialState = {
  orderData: null,
  orderRequest: false,
  error: null,
  userOrders: []
};

describe('Тест редьюсера orderSlice', () => {
  describe('Синхронные экшены', () => {
    test('Должен очищать orderData при clearOrderData', () => {
      const stateWithOrder = {
        ...initialState,
        orderData: mockOrder,
        error: 'Some error'
      };
      const newState = orderReducer(
        stateWithOrder,
        clearOrderData()
      );
      expect(newState.orderData).toBeNull();
      expect(newState.error).toBeNull();
    });
  });

  describe('Асинхронный экшен createOrder', () => {
    test('Должен устанавливать orderRequest в true при pending', () => {
      const newState = orderReducer(
        initialState,
        createOrder.pending('', ['ing1', 'ing2'])
      );
      expect(newState.orderRequest).toBe(true);
      expect(newState.orderData).toBeNull();
    });

    test('Должен сохранять заказ при fulfilled', () => {
      const newState = orderReducer(
        { ...initialState, orderRequest: true },
        createOrder.fulfilled(mockOrder, '', ['ing1', 'ing2'])
      );
      expect(newState.orderData).toEqual(mockOrder);
      expect(newState.orderRequest).toBe(false);
    });

    test('Должен сохранять ошибку при rejected', () => {
      const errorMessage = 'Ошибка создания заказа';
      const action = {
        type: createOrder.rejected.type,
        payload: errorMessage,
        error: { message: errorMessage }
      };
      const newState = orderReducer(
        { ...initialState, orderRequest: true },
        action
      );
      expect(newState.error).toBe(errorMessage);
      expect(newState.orderRequest).toBe(false);
    });
  });

  describe('Асинхронный экшен fetchUserOrdersThunk', () => {
    test('Должен сохранять заказы пользователя при fulfilled', () => {
      const mockOrders = [mockOrder];
      const newState = orderReducer(
        initialState,
        fetchUserOrdersThunk.fulfilled(mockOrders, '')
      );
      expect(newState.userOrders).toEqual(mockOrders);
    });

    test('Должен сохранять ошибку при rejected', () => {
      const errorMessage = 'Ошибка загрузки заказов';
      const action = {
        type: fetchUserOrdersThunk.rejected.type,
        payload: errorMessage,
        error: { message: errorMessage }
      };
      const newState = orderReducer(
        initialState,
        action
      );
      expect(newState.error).toBe(errorMessage);
    });
  });
});
