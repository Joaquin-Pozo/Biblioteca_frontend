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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import autorService from "../../services/autorService";
import { Box, Container, Typography } from "@mui/material";

const AutoresList = () => {
  const [autores, setAutores] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    autorService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de autores:", response.data);
        setAutores(response.data);
      })
      .catch((error) => {
        console.log("Error al obtener autores:", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleEdit = (id) => {
    navigate(`/autor/edit/${id}`);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Autores
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/autor/add"
        >
          Añadir Autor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="tabla autores">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Nombre Completo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Nacionalidad
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Fecha de Nacimiento
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {autores.map((autor) => (
              <TableRow key={autor.id}>
                <TableCell align="left">{autor.id}</TableCell>
                <TableCell align="left">{autor.nombreCompleto}</TableCell>
                <TableCell align="left">{autor.nacionalidad}</TableCell>
                <TableCell align="left">{autor.fechaNacimiento}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleEdit(autor.id)}
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
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
};

export default AutoresList;