import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@utils';
import { RootState } from '@store';

interface IngredientState {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientState = {
  items: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const ingredientsReducer = ingredientSlice.reducer;
export const ingredientsSelector = (state: RootState) =>
  state.ingredients.items;
