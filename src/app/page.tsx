'use client';
import { Button, Container, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGoToRecipes = () => {
    router.push('/recipes');
  };
  return (
    <Container sx={{ height: '100%' }}>
      <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
        <Button variant="contained" onClick={handleGoToRecipes}>
          Go to recipes
        </Button>
      </Stack>
    </Container>
  );
}
