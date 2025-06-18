import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  getUserApi,
  registerUserApi,
  logoutApi,
  deleteCookie,
  updateUserApi
} from '@utils';
import { TLoginData, TRegisterData } from '@utils';
import { RootState } from '@store';

interface UserState {
  user: TUser | null;
  loading: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecked: false
};

// Thunk для регистрации
export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, thunkAPI) => {
    try {
      const response = await registerUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      document.cookie = `accessToken=${response.accessToken}; path=/`;
      return response.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Thunk для логина
export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData, thunkAPI) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      document.cookie = `accessToken=${response.accessToken}; path=/`;
      return response.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Thunk для получения данных пользователя
export const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk('users/logoutUser', async () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>, thunkAPI) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearUserErrors: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthChecked = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAuthChecked = false;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAuthChecked = false;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getUserLoading: (state) => state.loading,
    getError: (state) => state.error,
    getIsAuthChecked: (state) => state.isAuthChecked
  }
});

export const userReducer = userSlice.reducer;
export const { authCheck, clearUserErrors, logout } = userSlice.actions;
export const userSelector = (state: RootState) => state.user.user;
export const { getUser, getError, getIsAuthChecked, getUserLoading } =
  userSlice.selectors;
