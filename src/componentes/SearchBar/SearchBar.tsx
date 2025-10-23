import React, { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import styles from './SearchBar.module.css';
import type { SearchBarProps, QuickSearchOption } from './SearchBar.types';

const quickSearchOptions: QuickSearchOption[] = [
  {
    label: 'Platos típicos',
    ingredients: ['papa', 'carne', 'cebolla'],
    icon: '🇧🇴'
  },
  {
    label: 'Comida saludable',
    ingredients: ['pollo', 'arroz', 'verduras'],
    icon: '🍗'
  },
  {
    label: 'Desayunos',
    ingredients: ['huevo', 'queso', 'leche'],
    icon: '🥚'
  }
];

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Ejemplo: pollo, papa, arroz, cebolla...',
  disabled = false,
  maxLength = 200
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !disabled) {
      onSearch();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const handleQuickSearch = (ingredients: string[]): void => {
    const ingredientsString = ingredients.join(', ');
    onChange(ingredientsString);
    setTimeout(() => onSearch(), 100);
  };

  // Parsing and Chunking
  const ingredientCount: number = value
    .split(',')
    .filter(ingredient => ingredient.trim()).length;

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.icon}>🔍</span>
            Busca recetas por ingredientes
          </h2>
          <p className={styles.subtitle}>
            Descubre deliciosas recetas con lo que tienes en casa
          </p>
        </div>
        
        <div className={`${styles.searchBox} ${isFocused ? styles.focused : ''}`}>
          <div className={styles.inputWrapper}>
            <span className={styles.searchIcon}>🥘</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              maxLength={maxLength}
              aria-label="Buscar recetas por ingredientes"
            />
            {value && !disabled && (
              <button
                className={styles.clearIcon}
                onClick={onClear}
                type="button"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.btn} ${styles.btnSearch}`} 
              onClick={onSearch}
              disabled={!value.trim() || disabled}
              aria-label="Buscar recetas"
              type="button"
            >
              <span className={styles.btnIcon}>🔎</span>
              Buscar
            </button>
            <button 
              className={`${styles.btn} ${styles.btnClear}`} 
              onClick={onClear}
              disabled={!value.trim() || disabled}
              aria-label="Limpiar campos"
              type="button"
            >
              <span className={styles.btnIcon}>🗑️</span>
              Limpiar
            </button>
          </div>
        </div>

        {ingredientCount > 0 && (
          <div className={styles.counter}>
            <span className={styles.badge} role="status" aria-live="polite">
              {ingredientCount} {ingredientCount === 1 ? 'ingrediente' : 'ingredientes'}
            </span>
          </div>
        )}

        <div className={styles.suggestions}>
        <span className={styles.suggestionLabel}>Sugerencias:</span>
          {quickSearchOptions.map((option, index) => (
            <button 
              key={index}
              className={styles.suggestionChip}
              onClick={() => handleQuickSearch(option.ingredients)}
              disabled={disabled}
              aria-label={`Búsqueda rápida: ${option.label}`}
              type="button"
            >
              <span className={styles.chipIcon}>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
