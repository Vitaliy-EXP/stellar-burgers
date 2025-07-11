import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  burgerConstructorReducer,
  addIngredient,
  upIngredient,
  downIngredient,
  removeIngredient,
  clearBurgerConstructor
} from '../constructorSlice';

const mockBun: TIngredient = {
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
};

const mockMain: TIngredient = {
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
};

const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

const initialState = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  error: null
};

const preloadedState = {
  burgerConstructor: {
    bun: null,
    ingredients: [
      { ...mockMain, id: '123' } as TConstructorIngredient,
      { ...mockSauce, id: '456' } as TConstructorIngredient
    ]
  },
  error: null
};

describe('Тест редьюсера burgerConstructorSlice', () => {
  describe('обработка экшена addIngredient', () => {
    test('добавление булки в burgerConstructor.bun', () => {
      const newState = burgerConstructorReducer(
        initialState,
        addIngredient(mockBun)
      );

      expect(newState.burgerConstructor.bun).toEqual(
        expect.objectContaining({
          ...mockBun,
          id: expect.any(String)
        })
      );
      expect(newState.burgerConstructor.ingredients).toEqual([]);
    });

    test('добавление начинки в burgerConstructor.ingredients', () => {
      const newState = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );

      expect(newState.burgerConstructor.bun).toBeNull();
      expect(newState.burgerConstructor.ingredients).toEqual([
        expect.objectContaining({
          ...mockMain,
          id: expect.any(String)
        })
      ]);
    });

    test('добавление соуса в burgerConstructor.ingredients', () => {
      const newState = burgerConstructorReducer(
        initialState,
        addIngredient(mockSauce)
      );

      expect(newState.burgerConstructor.bun).toBeNull();
      expect(newState.burgerConstructor.ingredients).toEqual([
        expect.objectContaining({
          ...mockSauce,
          id: expect.any(String)
        })
      ]);
    });
  });

  describe('тест экшена removeIngredient', () => {
    test('удаление ингредиента по id', () => {
      const newState = burgerConstructorReducer(
        preloadedState,
        removeIngredient({ ...mockMain, id: '123' } as TConstructorIngredient)
      );

      expect(newState.burgerConstructor.bun).toBeNull();
      expect(newState.burgerConstructor.ingredients).toEqual([
        expect.objectContaining({
          ...mockSauce,
          id: '456'
        })
      ]);
    });
  });

  describe('тест экшенов изменения порядка ингредиентов', () => {
    test('перемещение ингредиента вверх (upIngredient)', () => {
      const newState = burgerConstructorReducer(
        preloadedState,
        upIngredient(1)
      );

      expect(newState.burgerConstructor.ingredients).toEqual([
        expect.objectContaining(mockSauce),
        expect.objectContaining(mockMain)
      ]);
    });

    test('перемещение ингредиента вниз (downIngredient)', () => {
      const newState = burgerConstructorReducer(
        preloadedState,
        downIngredient(0)
      );

      expect(newState.burgerConstructor.ingredients).toEqual([
        expect.objectContaining(mockSauce),
        expect.objectContaining(mockMain)
      ]);
    });
  });

  describe('тест экшена clearBurgerConstructor', () => {
    test('очистка конструктора', () => {
      const filledState = {
        burgerConstructor: {
          bun: { ...mockBun, id: 'bun-123' } as TConstructorIngredient,
          ingredients: [
            { ...mockMain, id: '123' } as TConstructorIngredient,
            { ...mockSauce, id: '456' } as TConstructorIngredient
          ]
        },
        error: null
      };

      const newState = burgerConstructorReducer(
        filledState,
        clearBurgerConstructor()
      );

      expect(newState.burgerConstructor.bun).toBeNull();
      expect(newState.burgerConstructor.ingredients).toEqual([]);
      expect(newState).toEqual(initialState);
    });
  });
});
