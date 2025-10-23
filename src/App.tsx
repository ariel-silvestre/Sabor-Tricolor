import { useState } from 'react';
import Header from './componentes/Header/Header';
import SearchBar from './componentes/SearchBar/SearchBar';

import './App.css'

const App: React.FC = () => {
  const [searchIngredients, setSearchIngredients] = useState<string>('');
  
  const handleSearch = (): void => {
    console.log('Buscando con: ', searchIngredients);
    // Logica de busqueda.
  };

  const handleClear = (): void => {
    setSearchIngredients('');
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
      />
    </div>
  )
};

export default App;
