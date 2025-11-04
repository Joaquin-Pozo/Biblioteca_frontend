import { Typography, Container, Paper, Divider, Button} from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
          background: "linear-gradient(135deg, #00A19B 0%, #009688 100%)",
          color: "white",
        }}
      >
        <BlockIcon sx={{ fontSize: 60, color: "#FF6A13", mb: 2 }} />

        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Sistema de Gestión Biblioteca
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Lectura Viva
        </Typography>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.5)", mb: 3 }} />

        <Typography variant="h2" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Pagina no se encuentra disponible
        </Typography>
 	      <br /><br />
        <Button variant="contained" component={Link} to="/home">
        	Volver al Inicio
        </Button>
      </Paper>
    </Container>
  );
}