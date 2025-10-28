import type { RecetaConScore } from "./recipe.types";

export interface SearchFilters {
  regiones: string[];
  tipos: string[];
  proteinas: string[];
  caracteristicas: string[];
  dificultad?: string;
  tiempoMaximo?: number;
  costoMaximo?: string;
}

export interface SearchOptions {
  ingredientes: string[];
  filtros?: SearchFilters;
  ordenarPor?: 'relevancia' | 'tiempo' | 'popularidad' | 'valoracion';
  limitarResultados?: number;
}

export interface SearchResult {
  recetas: RecetaConScore[];
  totalResultados: number;
  tiempoBusqueda: number;
  sugerencias: string[];
}

export interface IngredienteSinonimos {
  nombre_principal: string;
  sinonimos: string[];
  variantes_regionales: Record<string, string[]>;
}
