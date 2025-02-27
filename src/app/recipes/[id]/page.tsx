'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  Button,
  Stack,
} from '@mui/material';
import { Recipe } from 'src/types/generalTypes';
import { useRecipeById } from '@/hooks/useRecipeById';
import { useParams } from 'next/navigation';

const RecipeDetails = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: recipe, isLoading } = useRecipeById(id);

  if (isLoading) return <Typography variant="h5">Loading...</Typography>;

  if (!recipe) return notFound();

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => ({
      ingredient: recipe[`strIngredient${i}` as keyof Recipe],
      measure: recipe[`strMeasure${i}` as keyof Recipe],
    }))
    .filter((item) => item.ingredient && item.ingredient.trim() !== '');

  return (
    <Container>
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <CardMedia component="img" height="300" image={recipe.strMealThumb} alt={recipe.strMeal} />
        <CardContent>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack>
              <Typography variant="h5">{recipe.strMeal}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {recipe.strCategory} | {recipe.strArea}
              </Typography>
            </Stack>
            <Button component={Link} href="/recipes" variant="contained">
              ⬅ Back to Recipes
            </Button>
          </Stack>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {recipe.strInstructions}
          </Typography>

          {ingredients.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Ingredients:
              </Typography>
              <List>
                {ingredients.map((item, index) => (
                  <ListItem key={index}>
                    {item.measure} {item.ingredient}
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {recipe.strYoutube && (
            <>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Video Recipe:
              </Typography>
              <iframe
                width="100%"
                height="315"
                src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen></iframe>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default RecipeDetails;
