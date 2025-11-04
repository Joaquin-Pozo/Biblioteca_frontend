import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import NotFound from "./components/NotFound";
import SocioList from "./components/SocioList";
import AddEditSocio from './components/AddEditSocio';
import AutoresList from './components/autores/AutoresList';
import AddEditAutor from './components/autores/AddEditAutor';
import LibroList from './components/LibroList';
import AddEditLibro from './components/AddEditLibro';

//import AddEditLibro from './components/libros/AddEditLibro';  

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>

        {/* Rutas para navegar por la app web */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />

          {/* Rutas para socios */}
          <Route path="/socio/list" element={<SocioList/>} />
          <Route path="/socio/add" element={<AddEditSocio/>} />
          <Route path="/socio/edit/:id" element={<AddEditSocio/>} />

          {/* Rutas para autores */}
          <Route path="/autor/list" element={<AutoresList/>} />
          <Route path="/autor/add" element={<AddEditAutor/>} />
          <Route path="/autor/edit/:id" element={<AddEditAutor/>} />

          {/* Rutas para libros */}
          <Route path="/libro/list" element={<LibroList/>} />
          <Route path="/libro/add" element={<AddEditLibro />} />
          <Route path="/libro/edit/:id" element={<AddEditLibro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;