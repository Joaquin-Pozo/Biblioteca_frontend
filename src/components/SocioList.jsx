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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import socioService from "../services/socio.service";
import { Box, Container, Typography } from "@mui/material";

const SocioList = () => {
  const [socios, setSocios] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    socioService
    .getAll()
    .then((response) => {
      console.log("Mostrando listado de socios.", response.data);
      setSocios(response.data);

    })
    .catch((error) => {
      console.log(
      "Se ha producido un error al intentar mostrar listado de socios.",
      error
      );
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este socio?"
    );
    if (confirmDelete) {
      socioService
        .remove(id)
        .then((response) => {
          console.log("Socio ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al socio",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/socio/edit/${id}`);
  };


  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Socios
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          component={Link}
          to="/socio/add"
        >
          Añadir Socio
        </Button>
      </Box>
    
      <TableContainer component={Paper}>
          <br /> <br />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Rut</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Telefono</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Correo</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {socios.map((socio) => ( 
                <TableRow
                  key={socio.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{socio.identificador}</TableCell>
                  <TableCell align="left">{socio.nombreCompleto}</TableCell>
                  <TableCell align="left">{socio.telefono}</TableCell>
                  <TableCell align="left">{socio.correo}</TableCell>
                  <TableCell align="left">{socio.estadoSocio}</TableCell>
                  
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEdit(socio.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(socio.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<DeleteIcon />}
                    >
                    Eliminar
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

export default SocioList;