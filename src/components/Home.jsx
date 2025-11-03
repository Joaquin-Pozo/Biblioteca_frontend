import { Box, Typography, Container, Paper, Divider, List, ListItem, ListItemText } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

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
        <LibraryBooksIcon sx={{ fontSize: 60, color: "#FF6A13", mb: 2 }} />

        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Sistema de Gestión Biblioteca
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Lectura Viva
        </Typography>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.5)", mb: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Taller de Base de Datos — USACH
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          Integrantes:
        </Typography>

        <List sx={{ display: "inline-block", textAlign:"center" }}>
          {["Joaquín Pozo", "Gianello Valenzuela", "Roberto Orellana", "Karina Bustamante"].map(
            (nombre, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={nombre}
                  primaryTypographyProps={{ color: "white", fontSize: "1rem" }}
                />
              </ListItem>
            )
          )}
        </List>
      </Paper>
    </Container>
  );
}
