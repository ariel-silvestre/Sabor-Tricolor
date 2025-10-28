import {
  IngredientNormalizer as BaseNormalizer,
  ingredientesDB as ingredientesData,
  type IngredienteData,
  type IngredientesDatabase
} from '@sabor-tricolor/ingredientes';

// Inicializar el normalizador (una sola vez al inicio)
const ingredientesDB = ingredientesData as unknown as IngredientesDatabase;

BaseNormalizer.initialize(ingredientesDB);

export const IngredientNormalizer = BaseNormalizer;

export type {
  IngredienteData,
  IngredientesDatabase,
};
