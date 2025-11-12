import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import libroService from "../services/libro.service";
import { Box, Container, Typography, TextField, Stack } from "@mui/material";

const LibroList = () => {
  const [libros, setLibros] = useState([]);
  const [tituloBusqueda, setTituloBusqueda] = useState("");
  const [autorBusqueda, setAutorBusqueda] = useState("");
  const navigate = useNavigate();

  const init = () => {
    libroService
    .getAll()
    .then((response) => {
      console.log("Mostrando listado de libros.", response.data);
      setLibros(response.data);

    })
    .catch((error) => {
      console.log(
      "Se ha producido un error al intentar mostrar listado de libros.",
      error
      );
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/libro/edit/${id}`);
  };

  // Busqueda por título
  const handleBuscarPorTitulo = () => {
    if (!tituloBusqueda.trim()) {
      init(); // si el campo está vacío, recarga todos los libros
      return;
    }

    libroService
      .buscarPorTitulo(tituloBusqueda)
      .then((response) => setLibros(response.data))
      .catch((error) => console.error("Error al buscar por título:", error));
  };

  // Limpia la busqueda de titulos
  const handleLimpiarTitulo = () => {
    setTituloBusqueda("");
    init(); // vuelve a cargar todos los libros
  };

  // Busqueda por autor
  const handleBuscarPorAutor = () => {
    if (!autorBusqueda.trim()) {
      init();
      return;
    }

    libroService
      .buscarPorAutor(autorBusqueda)
      .then((response) => setLibros(response.data))
      .catch((error) => console.error("Error al buscar por autor:", error));
  };

  // Limpia la busqueda de autores
  const handleLimpiarAutor = () => {
    setAutorBusqueda("");
    init();
  };


  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom align="center">
        Lista de Libros
      </Typography>

      {/* Sección de búsqueda */}
      <Box
        sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 4}}
      >
        {/* Búsqueda por título */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Buscar por título"
            variant="outlined"
            size="small"
            value={tituloBusqueda}
            onChange={(e) => setTituloBusqueda(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuscarPorTitulo}
          >
            Buscar
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleLimpiarTitulo}
          >
            Limpiar
          </Button>
        </Stack>

        {/* Búsqueda por autor */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            label="Buscar por autor"
            variant="outlined"
            size="small"
            value={autorBusqueda}
            onChange={(e) => setAutorBusqueda(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuscarPorAutor}
          >
            Buscar
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleLimpiarAutor}
          >
            Limpiar
          </Button>
        </Stack>
      </Box>

      {/* Botón para agregar libro */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LibraryBooksIcon />}
          component={Link}
          to="/libro/add"
        >
          Añadir Libro
        </Button>
      </Box>

      {/* Tabla de libros */}
      <TableContainer component={Paper}>
          <br /> <br />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla de libros">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Título</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Categoria</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Editorial</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Año de publicación</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Autor</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {libros.map((libro) => ( 
                <TableRow
                  key={libro.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{libro.titulo}</TableCell>
                  <TableCell align="left">{libro.categoria}</TableCell>
                  <TableCell align="left">{libro.editorial}</TableCell>
                  <TableCell align="left">{libro.anioPublicacion}</TableCell>
                  <TableCell>{libro.autor?.nombreCompleto}</TableCell>
                  
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEdit(libro.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>    
          </Table>
      </TableContainer>
    </Container>  
  );
}

export default LibroList;