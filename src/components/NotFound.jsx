// NotFound.jsx
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              La página web no se encuentra disponible.
            </Typography>
            <Button variant="contained" component={Link} to="/home">
              Volver al Inicio
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}