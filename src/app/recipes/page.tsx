'use client';
import { useState, useEffect } from 'react';
import { useRecipes } from '@/hooks/useRecipes';
import { Container, TextField, Stack, Typography, Box } from '@mui/material';
import CategoryFilter from '@/components/CategoryFilter';
import RecipeCard from '@/components/RecipeCard';
import Pagination from '@/components/Pagination';
import { Recipe } from 'src/types/generalTypes';

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const { data, isLoading } = useRecipes(debouncedQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredData = data?.filter((recipe: Recipe) =>
    category ? recipe.strCategory === category : true,
  );

  useEffect(() => {
    setPage(1);
  }, [category, debouncedQuery]);

  const recipesPerPage = 3;
  const paginatedData = filteredData?.slice((page - 1) * recipesPerPage, page * recipesPerPage);
  const totalPages = filteredData?.length ? Math.ceil(filteredData.length / recipesPerPage) : 0;

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box height={'100vh'} alignContent={'center'} gap={2}>
      <Container>
        <TextField
          label="Search Recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <CategoryFilter category={category} onCategoryChange={handleCategoryChange} />
      </Container>

      <Container>
        <Stack direction="row" flexWrap="wrap" gap={'5.07%'} mb={4}>
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map((recipe: Recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', width: '100%', mt: 4 }}>
              No recipes found
            </Typography>
          )}
        </Stack>
      </Container>

      {filteredData && filteredData.length > 0 && (
        <Container>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
      )}
    </Box>
  );
};

export default RecipesPage;
