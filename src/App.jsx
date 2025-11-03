import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import NotFound from "./components/NotFound";
import SocioList from "./components/SocioList";
import AddEditSocio from './components/AddEditSocio';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>

        {/* Rutas para navegar por la app web */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/socio/list" element={<SocioList/>} />
          <Route path="/socio/add" element={<AddEditSocio/>} />
          <Route path="/socio/edit/:id" element={<AddEditSocio/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;