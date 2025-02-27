import { useQuery } from '@tanstack/react-query';

export const useRecipes = (searchQuery: string) => {
  return useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: async () => {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;

      const response = await fetch(url);
      const data = await response.json();
      return data.meals || [];
    },
    staleTime: 1000 * 60 * 5, // Залишити кеш для 5 хвилин
    gcTime: 1000 * 60 * 10, // Залишити дані в кеші до 10 хвилин
    refetchOnWindowFocus: false, // Не перезапитувати при фокусуванні вікна
  });
};
