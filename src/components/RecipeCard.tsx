'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Recipe, RecipeCardProps } from 'src/types/generalTypes';
import { useFavorites } from '@/hooks/useFavorites';

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const router = useRouter();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const isFavorite = favorites?.data?.some((fav: Recipe) => fav.idMeal === recipe.idMeal);

  const handleLearnMore = () => {
    router.push(`/recipes/${recipe.idMeal}`);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, width: '100%' }} key={recipe.idMeal}>
      <CardHeader title={recipe.strMeal} subheader={recipe.strCategory} />
      <CardMedia component="img" height="194" image={recipe.strMealThumb} alt={recipe.strMeal} />
      <CardContent>
        <Typography>{recipe.strArea}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteToggle}>
          <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
        </IconButton>
        <Button size="small" onClick={handleLearnMore}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
