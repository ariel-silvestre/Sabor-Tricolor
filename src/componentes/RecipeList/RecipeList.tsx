import React from "react";
import styles from './RecipeList.module.css';
import type { Recipe } from "../../services/recipeSearch.service";

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          🍽️ Recetas Encontradas ({recipes.length})
        </h2>
      </div>

      <div className={styles.grid}>
        {recipes.map(recipe => (
          <div key={recipe.id} className={styles.card}>
            {recipe.image && (
              <div className={styles.imageContainer}>
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className={styles.image}
                />
              </div>
            )}
            
            <div className={styles.content}>
              <h3 className={styles.recipeTitle}>{recipe.title}</h3>
              
              <div className={styles.meta}>
                <span className={styles.badge}>{recipe.category}</span>
                <span className={styles.badge}>{recipe.difficulty}</span>
                <span className={styles.badge}>⏱️ {recipe.time}</span>
              </div>

              <div className={styles.ingredients}>
                <strong>Ingredientes:</strong>
                <ul>
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>

              <button className={styles.btnView}>
                Ver Receta Completa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
