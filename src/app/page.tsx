'use client';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGoToRecipes = () => {
    router.push('/recipes');
  };
  const handleGoToFavorites = () => {
    router.push('/favorites');
  };
  return (
    <Container sx={{ height: '100%' }}>
      <Stack height={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h4" sx={{ color: 'black', mb: 2 }}>
          Welcome to the Recipes-App!
        </Typography>
        <Stack flexDirection={'row'} gap={3}>
          <Button variant="contained" onClick={handleGoToRecipes}>
            Go to recipes
          </Button>
          <Button variant="contained" onClick={handleGoToFavorites}>
            Go to favorites
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
