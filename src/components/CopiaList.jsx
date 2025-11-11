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
import copiaService from "../services/copia.service";
import { Box, Container, Typography } from "@mui/material";

const CopiaList = () => {
  const [copias, setCopias] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    copiaService
    .getAll()
    .then((response) => {
      console.log("Mostrando listado copias de libros.", response.data);
      setCopias(response.data);

    })
    .catch((error) => {
      console.log(
      "Se ha producido un error al intentar mostrar listado copias de libros.",
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
      "¿Esta seguro que desea dar de baja esta copia de libro?"
    );
    if (confirmDelete) {
      copiaService
        .remove(id)
        .then((response) => {
          console.log("Copia de libro ha sido dada de baja.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar dar de baja la copia de libro.",
            error
          );
        });
    }
  };

  const handleRepair = (id) => {
    console.log("Printing id", id);
    const confirmRepair = window.confirm(
      "¿Esta seguro que desea reparar esta copia de libro?"
    );
    if (confirmRepair) {
      copiaService
        .repair(id)
        .then((response) => {
          console.log("Copia de libro ha sido reparada.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar reparar la copia de libro.",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/copia/edit/${id}`);
  };


  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Lista copias de Libros
      </Typography>
    
      <TableContainer component={Paper}>
          <br /> <br />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Título</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Código</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>Estado</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {copias.map((copia) => ( 
                <TableRow
                  key={copia.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{copia.libro?.titulo}</TableCell>
                  <TableCell align="left">{copia.codigoBarras}</TableCell>
                  <TableCell align="left">{copia.estadoCopia}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => handleEdit(copia.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                    {/* Botón para dar de baja una copia */}
                    {copia.estadoCopia != "baja" && copia.estadoCopia != "reparacion" && (
                      <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(copia.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<DeleteIcon />}
                      >
                      Dar de baja
                      </Button>
                    )}
                    {/* Botón para dar de reparar una copia */}
                    {copia.estadoCopia === "reparacion" && (
                      <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleRepair(copia.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<DeleteIcon />}
                      >
                      Reparar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>    
          </Table>
      </TableContainer>
    </Container>  
  );
}

export default CopiaList;