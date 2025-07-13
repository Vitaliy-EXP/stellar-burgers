import { TUser } from '@utils-types';
import {
  userReducer,
  fetchUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from '../userSlice';

jest.mock('@utils', () => ({
  getUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  updateUserApi: jest.fn(),
  deleteCookie: jest.fn()
}));

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

const registerData = {
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123'
};

const loginData = {
  email: 'test@example.com',
  password: 'password123'
};

const updateData = {
  name: 'Updated User'
};

const initialState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

describe('Тест редьюсера userSlice', () => {
  test('fetchUserThunk.fulfilled должен установить пользователя и isAuthChecked в true', () => {
    const newState = userReducer(initialState, fetchUserThunk.fulfilled(mockUser, ''));
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('fetchUserThunk.rejected должен установить isAuthChecked в true', () => {
    const newState = userReducer(initialState, fetchUserThunk.rejected(null, ''));
    expect(newState.isAuthChecked).toBe(true);
  });

  test('registerUserThunk.pending должен установить loading в true', () => {
    const newState = userReducer(
      initialState,
      registerUserThunk.pending('requestId1', registerData)
    );
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('registerUserThunk.fulfilled должен установить пользователя и isAuthChecked в true', () => {
    const newState = userReducer(
      initialState,
      registerUserThunk.fulfilled(mockUser, '', registerData)
    );
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
  });

  test('registerUserThunk.rejected должен установить ошибку и loading в false', () => {
    const error = 'Register failed';
    const newState = userReducer(
      initialState,
      registerUserThunk.rejected(null, '', registerData, error)
    );
    expect(newState.error).toBe(error);
    expect(newState.loading).toBe(false);
  });

  test('loginUserThunk.pending должен установить loading в true', () => {
    const newState = userReducer(
      initialState,
      loginUserThunk.pending('requestId1', loginData)
    );
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('loginUserThunk.fulfilled должен установить пользователя и isAuthChecked в true', () => {
    const newState = userReducer(
      initialState,
      loginUserThunk.fulfilled(mockUser, '', loginData)
    );
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.loading).toBe(false);
  });

  test('loginUserThunk.rejected должен установить ошибку и isAuthChecked в false', () => {
    const error = 'Login failed';
    const newState = userReducer(
      initialState,
      loginUserThunk.rejected(null, '', loginData, error)
    );
    expect(newState.error).toBe(error);
    expect(newState.isAuthChecked).toBe(false);
    expect(newState.loading).toBe(false);
  });

  test('logoutUserThunk.fulfilled должен очистить пользователя и установить isAuthChecked в false', () => {
    const loggedInState = { ...initialState, user: mockUser, isAuthChecked: true };
    const newState = userReducer(loggedInState, logoutUserThunk.fulfilled(undefined, ''));
    expect(newState.user).toBeNull();
    expect(newState.isAuthChecked).toBe(false);
  });

  test('logoutUserThunk.rejected должен установить ошибку', () => {
    const error = 'Logout failed';
    const newState = userReducer(
      initialState,
      logoutUserThunk.rejected(null, '', undefined, error)
    );
    expect(newState.error).toBe(error);
  });

  test('updateUserThunk.pending должен установить loading в true', () => {
    const newState = userReducer(
      initialState,
      updateUserThunk.pending('', updateData)
    );
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('updateUserThunk.fulfilled должен обновить пользователя и установить loading в false', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const newState = userReducer(
      { ...initialState, user: mockUser },
      updateUserThunk.fulfilled(updatedUser, '', updateData)
    );
    expect(newState.user).toEqual(updatedUser);
    expect(newState.loading).toBe(false);
  });

  test('updateUserThunk.rejected должен установить ошибку и loading в false', () => {
    const error = 'Update failed';
    const newState = userReducer(
      { ...initialState, user: mockUser },
      updateUserThunk.rejected(null, '', updateData, error)
    );
    expect(newState.error).toBe(error);
    expect(newState.loading).toBe(false);
  });
});
