import { ingredientsReducer, fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  }
];

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

describe('Тест редьюсера ingredientsSlice', () => {
  describe('Обработка асинхронного экшена fetchIngredients', () => {
    test('Должен установить isLoading в true при pending', () => {
      const newState = ingredientsReducer(
        initialState,
        fetchIngredients.pending('')
      );

      expect(newState.isLoading).toBe(true);
      expect(newState.items).toEqual([]);
      expect(newState.error).toBeNull();
    });

    test('Должен сохранить ингредиенты и сбросить isLoading при fulfilled', () => {
      const newState = ingredientsReducer(
        { ...initialState, isLoading: true },
        fetchIngredients.fulfilled(mockIngredients, '')
      );

      expect(newState.isLoading).toBe(false);
      expect(newState.items).toEqual(mockIngredients);
      expect(newState.error).toBeNull();
    });

    test('Должен сохранить ошибку и сбросить isLoading при rejected', () => {
      const errorMessage = 'Ошибка загрузки';
      const action = {
        type: fetchIngredients.rejected.type,
        payload: errorMessage,
        error: { message: errorMessage }
      };
      const newState = ingredientsReducer(
        { ...initialState, isLoading: true },
        action
      );
    
      expect(newState.isLoading).toBe(false);
      expect(newState.items).toEqual([]);
      expect(newState.error).toBe(errorMessage);
    });
  });
});
