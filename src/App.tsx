import { useState } from 'react';
import Header from './componentes/Header/Header';
import SearchBar from './componentes/SearchBar/SearchBar';
import RecipeList from './componentes/RecipeList/RecipeList';
import { type Recipe, RecipeSearchService } from './services/recipeSearch.service';

import './App.css'

const App: React.FC = () => {
  const [searchIngredients, setSearchIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleSearch = (): void => {
    if (!searchIngredients.trim()) return;

    setIsLoading(true);
    console.log('Buscando con: ', searchIngredients);

    try {
      // Parser ingredientes (separados por coma)
      const ingredientList = searchIngredients
        .split(',')
        .map(ing => ing.trim())
        .filter(Boolean);
      
      // Buscar recetas
      const results = RecipeSearchService.searchByIngredients(
        ingredientList,
        {
          minIngredients: 1,
          maxResults: 20,
          sortBy: 'relevancia'
        }
      );

      console.log(`Encontrados ${results.length} recetas`);
      setRecipes(results);
    } catch (error) {
      console.error('Error al buscar recetas: ', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = (): void => {
    setSearchIngredients('');
    setRecipes([]);
  };

  const handleIngredientChange = (value: string): void => {
    setSearchIngredients(value);
  };

  return (
    <div className="app">
      <Header />

      <SearchBar
        value={searchIngredients}
        onChange={handleIngredientChange}
        onSearch={handleSearch}
        onClear={handleClear}
        maxLength={250}
        disabled={isLoading}
      />

      {isLoading &&(
        <div className='loading'>
          <p>🔍 Buscando recetas...</p>
        </div>
      )}

      {!isLoading && recipes.length > 0 && (
        <RecipeList recipes={recipes} />
      )}

      {!isLoading && searchIngredients && recipes.length === 0 && (
        <div className='no-results'>
          <p>😕 No se encontraron recetas con esos ingredientes</p>
          <p>Intenta con otros ingredientes os usa las Sugerencias</p>
        </div>
      )}
    </div>
  )
};

export default App;
