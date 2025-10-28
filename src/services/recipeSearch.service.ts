import { IngredientNormalizer } from "./ingredientNormalizer";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  difficulty: 'fácil' | 'medio' | 'difícil';
  time: string;
  image?: string;
}

// Base de datos de recetas (temporal)
const RECIPES: Recipe[] = [
  {
    id: 'rec_001',
    title: 'Salteñas',
    ingredients: ['carne', 'papa', 'cebolla', 'ají', 'huevo'],
    instructions: [
      'Preparar el relleno con carne, papa y cebolla',
      'Hacer la masa',
      'Rellenar y hornear'
    ],
    category: 'Platos típicos',
    difficulty: 'medio',
    time: '2 horas',
    image: 'https://chipabythedozen.com/wp-content/uploads/2020/08/Saltenas-Bolivianas-de-Pollo18-700x467.png'
  },
  {
    id: 'rec_002',
    title: 'Silpancho',
    ingredients: ['carne', 'arroz', 'papa', 'huevo', 'tomate', 'cebolla'],
    instructions: [
      'Empanar y freír la carne',
      'Preparar arroz y papas fritas',
      'Freír huevo y servir con ensalada'
    ],
    category: 'Platos típicos',
    difficulty: 'fácil',
    time: '30 minutos'
  },
  {
    id: 'rec_003',
    title: 'Pique Macho',
    ingredients: ['carne', 'salchicha', 'papa', 'cebolla', 'tomate', 'ají'],
    instructions: [
      'Cortar y freír la carne y salchichas',
      'Preparar papas fritas',
      'Mezclar todo y servir caliente'
    ],
    category: 'Platos típicos',
    difficulty: 'fácil',
    time: '45 minutos'
  },
  {
    id: 'rec_004',
    title: 'Pollo al Horno',
    ingredients: ['pollo', 'papa', 'cebolla', 'ají', 'tomate'],
    instructions: [
      'Sazonar el pollo',
      'Hornear con papas y verduras',
      'Servir caliente'
    ],
    category: 'Comida saludable',
    difficulty: 'fácil',
    time: '1 hora'
  },
  {
    id: 'rec_005',
    title: 'Huevos Revueltos con Queso',
    ingredients: ['huevo', 'queso', 'leche', 'cebolla'],
    instructions: [
      'Batir huevos con leche',
      'Cocinar con queso',
      'Servir caliente'
    ],
    category: 'Desayunos',
    difficulty: 'fácil',
    time: '10 minutos'
  }
];

export interface SearchOptions {
  minIngredients?: number;
  maxResults?: number;
  sortBy?: 'relevancia' | 'tiempo' | 'dificultad';
}

export class RecipeSearchService {
  /**
   * Buscar recetas por ingredientes
   */
  static searchByIngredients(
    userIngredients: string[],
    options: SearchOptions = {}
  ): Recipe[] {
    const {
      minIngredients = 1,
      maxResults = 20,
      sortBy = 'relevancia'
    } = options;

    // 1. Normalizar ingredientes del usuario
    const normalizedUserIngredients = IngredientNormalizer.normalizarMultiples(
      userIngredients
    );

    console.log('🔍 Ingredientes del usuario (normalizados):', normalizedUserIngredients);

    // 2. Buscar recetas que coincidan
    const matches = RECIPES.map(recipe => {
      // Normalizar ingredientes de la receta
      const normalizedRecipeIngredients = IngredientNormalizer.normalizarMultiples(
        recipe.ingredients
      );

      // ✅ CORRECCIÓN: Comparar ingredientes del USUARIO con ingredientes de la RECETA
      const matchedIngredients = normalizedUserIngredients.filter(userIng =>
        normalizedRecipeIngredients.some(recipeIng =>
          IngredientNormalizer.sonSinonimos(userIng, recipeIng)
        )
      );

      const matchCount = matchedIngredients.length;
      const totalRequired = normalizedRecipeIngredients.length;
      const matchPercentage = matchCount > 0 ? (matchCount / totalRequired) * 100 : 0;

      // Debug: mostrar info de cada receta
      console.log(`📋 ${recipe.title}:`, {
        ingredientesReceta: recipe.ingredients,
        coincidencias: matchedIngredients,
        matchCount,
        totalRequired,
        porcentaje: `${matchPercentage.toFixed(1)}%`
      });

      return {
        recipe,
        matchCount,
        totalRequired,
        matchPercentage,
        matchedIngredients
      };
    });

    // 3. Filtrar por mínimo de ingredientes
    let filtered = matches.filter(m => m.matchCount >= minIngredients);

    console.log(`✅ Recetas que cumplen criterio (min ${minIngredients} ingredientes):`, 
      filtered.map(f => `${f.recipe.title} (${f.matchCount}/${f.totalRequired})`));

    // 4. Ordenar
    filtered.sort((a, b) => {
      if (sortBy === 'relevancia') {
        return b.matchPercentage - a.matchPercentage;
      } else if (sortBy === 'tiempo') {
        const timeA = parseInt(a.recipe.time) || 999;
        const timeB = parseInt(b.recipe.time) || 999;
        return timeA - timeB;
      } else if (sortBy === 'dificultad') {
        const difficultyOrder = { 'fácil': 1, 'medio': 2, 'difícil': 3 };
        return difficultyOrder[a.recipe.difficulty] - difficultyOrder[b.recipe.difficulty];
      }
      return 0;
    });

    // 5. Limitar resultados
    const results = filtered.slice(0, maxResults).map(m => m.recipe);
    
    console.log(`🍽️ Resultados finales (${results.length}):`, results.map(r => r.title));

    return results;
  }

  /**
   * Obtener categorías disponibles
   */
  static getCategories(): string[] {
    const categories = new Set(RECIPES.map(r => r.category));
    return Array.from(categories).sort();
  }

  /**
   * Buscar recetas por categoría
   */
  static searchByCategory(category: string): Recipe[] {
    return RECIPES.filter(
      r => r.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Obtener estadísticas de ingredientes
   */
  static getIngredientStats() {
    return IngredientNormalizer.obtenerEstadisticas();
  }
}
