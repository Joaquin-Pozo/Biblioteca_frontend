import './App.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>
        {/* <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Biblioteca Lectura Viva
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>*/}

        {/* Rutas para navegar por la app web */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          {/*<Route path="/socio/list" element={<SocioList/>} />
          <Route path="/socio/add" element={<AddEditSocio/>} />
          <Route path="/socio/edit/:id" element={<AddEditSocio/>} />*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;