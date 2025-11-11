import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import libroService from "../services/libro.service";
import { Box, Container, Typography } from "@mui/material";

const LibroList = () => {
  const [libros, setLibros] = useState([]);
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


  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Libros
      </Typography>

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
    
      <TableContainer component={Paper}>
          <br /> <br />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Título</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Categoria</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Editorial</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Publicación</TableCell>
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
                  
                  <TableCell>
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