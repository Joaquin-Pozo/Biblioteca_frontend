import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #00A19B 0%, #009688 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.1)",
                color: "#FF6A13", // Naranja USACH
              },
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              letterSpacing: 0.5,
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Sistema de Gestión Biblioteca — Lectura Viva
          </Typography>
           {/*Logo USACH aquí */}
          <Box
            component="img"
            src="/usach-b.png" // logo en public/
            alt="Logo USACH"
            sx={{
              height: 40,
              ml: 2,
            }}
          />
        </Toolbar>
      </AppBar>

      <Sidebar open={open} toggleDrawer={toggleDrawer} />
    </Box>
  );
}
