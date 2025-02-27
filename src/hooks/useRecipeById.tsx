'use client';

import { useQuery } from '@tanstack/react-query';
import { Recipe } from 'src/types/generalTypes';

const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};

export const useRecipeById = (id: string) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
