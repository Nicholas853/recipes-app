import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Recipe } from 'src/types/generalTypes';

const LOCAL_STORAGE_KEY = 'favorites';

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const loadFavoritesFromLocalStorage = () => {
    const savedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  };

  const addFavorite = (recipe: Recipe) => {
    const currentFavorites = queryClient.getQueryData<Recipe[]>(['favorites']) || [];

    const updatedFavorites = [...currentFavorites, recipe];
    queryClient.setQueryData(['favorites'], updatedFavorites);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (recipeId: string) => {
    const currentFavorites = queryClient.getQueryData<Recipe[]>(['favorites']) || [];

    const updatedFavorites = currentFavorites.filter((recipe) => recipe.idMeal !== recipeId);
    queryClient.setQueryData(['favorites'], updatedFavorites);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFavorites));
  };

  return {
    favorites: useQuery({
      queryKey: ['favorites'],
      queryFn: loadFavoritesFromLocalStorage,
      staleTime: 1000 * 60 * 5,
    }),
    addFavorite,
    removeFavorite,
  };
};
