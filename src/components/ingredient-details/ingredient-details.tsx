import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { ingredientsSelector } from '@slices';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelector);
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
