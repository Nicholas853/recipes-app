'use client';
import { useState, useEffect } from 'react';
import { useRecipes } from '@/hooks/useRecipes';
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Stack,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const { data, isLoading } = useRecipes(debouncedQuery);

  // Дебаунс для пошуку
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Фільтрація за категорією лише на фронтенді
  const filteredData = data?.filter((recipe: any) =>
    category ? recipe.strCategory === category : true,
  );

  // Скидаємо сторінку до 1 при зміні фільтрів
  useEffect(() => {
    setPage(1);
  }, [category, debouncedQuery]);

  // Пагінація
  const recipesPerPage = 3;
  const paginatedData = filteredData?.slice((page - 1) * recipesPerPage, page * recipesPerPage);

  // Загальна кількість сторінок
  const totalPages = filteredData?.length ? Math.ceil(filteredData.length / recipesPerPage) : 0;

  // Логіка для відображення сторінок пагінації
  const paginationRange = () => {
    const range: (number | string)[] = [];

    if (!totalPages || totalPages <= 0) {
      return [1];
    }

    // Показуємо всі сторінки, якщо їх не більше 7
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Завжди показуємо першу сторінку
    range.push(1);

    let startPage = Math.max(2, page - 2);
    let endPage = Math.min(totalPages - 1, page + 2);

    // Якщо ми близько до початку, показуємо більше сторінок справа
    if (page < 4) {
      endPage = 7;
    }

    // Якщо ми близько до кінця, показуємо більше сторінок зліва
    if (page > totalPages - 4) {
      startPage = totalPages - 6;
    }

    // Додаємо "..." після першої сторінки, якщо startPage > 2
    if (startPage > 2) {
      range.push('...');
    }

    // Додаємо сторінки між початковою та кінцевою
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    // Додаємо "..." перед останньою сторінкою, якщо endPage < totalPages - 1
    if (endPage < totalPages - 1) {
      range.push('...');
    }

    // Завжди показуємо останню сторінку
    range.push(totalPages);

    return range;
  };

  // Обробка зміни категорії
  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value as string);
  };

  // Обробка зміни сторінки
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Container>
        <TextField
          label="Search Recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange}>
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Beef">Beef</MenuItem>
            <MenuItem value="Chicken">Chicken</MenuItem>
            <MenuItem value="Dessert">Dessert</MenuItem>
            <MenuItem value="Lamb">Lamb</MenuItem>
            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
            <MenuItem value="Pasta">Pasta</MenuItem>
            <MenuItem value="Pork">Pork</MenuItem>
            <MenuItem value="Seafood">Seafood</MenuItem>
            <MenuItem value="Side">Side</MenuItem>
            <MenuItem value="Starter">Starter</MenuItem>
            <MenuItem value="Vegan">Vegan</MenuItem>
            <MenuItem value="Vegetarian">Vegetarian</MenuItem>
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Goat">Goat</MenuItem>
          </Select>
        </FormControl>
      </Container>

      <Container>
        <Stack direction="row" flexWrap="wrap" justifyContent={'space-between'} gap={2} mb={4}>
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map((recipe: any) => (
              <Card sx={{ maxWidth: 345, width: '100%', mb: 2 }} key={recipe.idMeal}>
                <CardHeader title={recipe.strMeal} subheader={recipe.strCategory} />
                <CardMedia
                  component="img"
                  height="194"
                  image={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
                <CardContent>
                  <Typography>{recipe.strArea}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
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
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            my={4}
            flexWrap="wrap"
            gap={1}>
            <Button
              variant="contained"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}>
              Previous
            </Button>

            {/* Сторінки пагінації */}
            {paginationRange().map((pageNum, index) => (
              <Button
                key={index}
                variant={pageNum === page ? 'contained' : 'outlined'}
                disabled={pageNum === '...'}
                onClick={() => {
                  if (typeof pageNum === 'number') {
                    handlePageChange(pageNum);
                  }
                }}
                sx={{ minWidth: '40px' }}>
                {pageNum}
              </Button>
            ))}

            <Button
              variant="contained"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}>
              Next
            </Button>
          </Stack>
        </Container>
      )}
    </div>
  );
};

export default RecipesPage;
