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
import { RecipeCardProps } from 'src/types/generalTypes';

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345, width: '100%' }} key={recipe.idMeal}>
      <CardHeader title={recipe.strMeal} subheader={recipe.strCategory} />
      <CardMedia component="img" height="194" image={recipe.strMealThumb} alt={recipe.strMeal} />
      <CardContent>
        <Typography>{recipe.strArea}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
