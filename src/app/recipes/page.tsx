'use client';
import { useState } from 'react';
import { useRecipes } from '@/hooks/useRecipes';
import Image from 'next/image';

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError, error } = useRecipes(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <div>Loading recipes...</div>;

  if (isError) return <div>Error: {error?.message || 'Something went wrong'}</div>;

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for recipes"
        className="search-input"
      />
      <div className="recipes-list">
        {data?.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((recipe: any) => (
            <div key={recipe.idMeal} className="recipe-card">
              <h3>{recipe.strMeal}</h3>
              <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
              <p>{recipe.strCategory}</p>
              <p>{recipe.strArea}</p>
              <a href={`/recipes/${recipe.idMeal}`} className="view-details">
                View Details
              </a>
            </div>
          ))
        ) : (
          <div>No recipes found</div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
