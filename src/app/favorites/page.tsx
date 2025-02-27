'use client';

import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  List,
  ListItem,
  Button,
} from '@mui/material';
import { useFavorites } from '@/hooks/useFavorites';
import { Recipe } from 'src/types/generalTypes';
import { useRouter } from 'next/navigation';

interface Ingredient {
  ingredient: string;
  measure: string;
}

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const router = useRouter();

  const handleGoToMainPage = () => {
    router.push('/');
  };

  const handleGoToRecipes = () => {
    router.push('/recipes');
  };

  const recipes = favorites?.data;

  if (!recipes || recipes.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
          You have no favorite recipes yet.
        </Typography>
        <Stack flexDirection={'row'} justifyContent={'center'} gap={2}>
          <Button variant="contained" onClick={handleGoToMainPage}>
            Go to main page
          </Button>
          <Button variant="contained" onClick={handleGoToRecipes}>
            Go to recipes
          </Button>
        </Stack>
      </Container>
    );
  }

  const ingredients = recipes
    .map((recipe: Recipe) =>
      Array.from({ length: 20 }, (_, i) => i + 1)
        .map((i) => ({
          ingredient: recipe[`strIngredient${i}` as keyof Recipe],
          measure: recipe[`strMeasure${i}` as keyof Recipe],
        }))
        .filter((item) => item.ingredient && item.ingredient.trim() !== ''),
    )
    .flat();

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', color: 'black' }}>
        Your Favorite Recipes
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={3} justifyContent="center">
        {recipes.map((recipe: Recipe) => (
          <Box key={recipe.idMeal} sx={{ width: '300px', flex: '1 1 300px', maxWidth: '100%' }}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.strMealThumb}
                alt={recipe.strMeal}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {recipe.strMeal}
                </Typography>
                <Typography variant="body2">
                  {recipe.strCategory} | {recipe.strArea}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
          Ingredients:
        </Typography>
        <Stack height={'50%'} flexDirection={'row'} gap={2}>
          <Button variant="contained" onClick={handleGoToMainPage}>
            Go to main page
          </Button>
          <Button variant="contained" onClick={handleGoToRecipes}>
            Go to recipes
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ backgroundColor: '#f9f9f9', borderRadius: 1, p: 2 }}>
        <List>
          {ingredients.map((item: Ingredient, index: number) => (
            <ListItem key={index} sx={{ paddingLeft: 0 }}>
              <Typography variant="body1" sx={{ color: 'black' }}>
                {item.measure && `${item.measure} `}
                {item.ingredient}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default FavoritesPage;
