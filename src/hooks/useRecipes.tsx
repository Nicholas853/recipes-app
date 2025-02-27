import { useQuery } from '@tanstack/react-query';

export const useRecipes = (searchQuery: string) => {
  return useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
      );
      const data = await response.json();
      return data.meals || [];
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
