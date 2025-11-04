import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import DrawIcon from '@mui/icons-material/Draw';
import { Link } from "react-router-dom";

export default function Sidebar({ open, toggleDrawer }) {
  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/home" },
    { text: "Socios", icon: <GroupIcon />, path: "/socio/list" },
    { text: "Autores", icon: <DrawIcon />, path: "/autor/list" },
    { text: "Libros", icon: <LibraryBooksIcon />, path: "/libro/list" },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: 260,
          background: "linear-gradient(180deg, #00A19B 0%, #00796B 100%)",
          color: "white",
        },
      }}
    >
      {/* Encabezado del sidebar */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          bgcolor: "rgba(0,0,0,0.1)",
        }}
      >
        <img
          src="/usach-b.png"
          alt="Logo USACH"
          style={{ width: "80px", marginBottom: "8px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 0.5 }}>
          Biblioteca
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#FFB74D" }}>
          Lectura Viva
        </Typography>
      </Box>

      {/* Menú principal */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  color: "#FFB74D",
                  transition: "0.2s",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

      {/* Sección inferior */}
      <Box sx={{ mt: "auto", p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={toggleDrawer(false)}
            sx={{
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                color:  "#FFB74D",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}