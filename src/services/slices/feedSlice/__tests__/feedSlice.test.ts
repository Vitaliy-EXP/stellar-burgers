import { feedReducer, setFeedOrders, setFeedTotal, setFeedTotalToday } from '../feedSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Burger',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  number: 1,
  ingredients: ['ing1', 'ing2']
};

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0
};

describe('Тест редьюсера feedSlice', () => {
  test('должен обрабатывать setFeedOrders', () => {
    const newState = feedReducer(
      initialState,
      setFeedOrders([mockOrder])
    );
    expect(newState.orders).toEqual([mockOrder]);
  });

  test('должен обрабатывать setFeedTotal', () => {
    const newState = feedReducer(
      initialState,
      setFeedTotal(100)
    );
    expect(newState.total).toBe(100);
  });

  test('должен обрабатывать setFeedTotalToday', () => {
    const newState = feedReducer(
      initialState,
      setFeedTotalToday(10)
    );
    expect(newState.totalToday).toBe(10);
  });
});
