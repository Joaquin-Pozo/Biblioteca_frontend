import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import prestamoService from "../../services/prestamoService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const PrestamosList = () => {
  const [prestamos, setPrestamos] = useState([]);
  const navigate = useNavigate();

  // Inicializa los préstamos
  const init = () => {
    prestamoService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de préstamos:", response.data);
        setPrestamos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener préstamos:", error);
      });
  };

  const handleReturn = (id) => {
    navigate(`/prestamo/return/${id}`);
  };

  useEffect(() => {
    init();
  }, []);

  // Helper para formatear fechas legibles
  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return "-";
    const date = new Date(dateTimeStr);
    return date.toLocaleString("es-CL", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Préstamos
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate("/prestamo/add")}
        sx={{ mb: 2 }}
      >
        Registrar Préstamo
      </Button>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Socio</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Libro</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Autor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fecha Préstamo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Fecha Pactada Devolución
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Multa ($)</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Dañado</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Operaciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {prestamos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.socio?.nombreCompleto ?? "—"}</TableCell>
                <TableCell>
                  {p.copia?.libro?.titulo ?? "—"}
                </TableCell>
                <TableCell>
                  {p.copia?.libro?.autor?.nombreCompleto ?? "—"}
                </TableCell>
                <TableCell>{formatDate(p.fechaPrestamo)}</TableCell>
                <TableCell>{formatDate(p.fechaPactadaDevolucion)}</TableCell>
                <TableCell>{p.estadoPrestamo}</TableCell>
                <TableCell>{p.multa ?? 0}</TableCell>
                <TableCell>{p.daniado ? "Sí" : "No"}</TableCell>

                <TableCell>
                  {p.estadoPrestamo === "activo" && (
                    <Tooltip title="Registrar devolución">
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => handleReturn(p.id)}
                        startIcon={<EditIcon />}
                      >
                        Devolver
                      </Button>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {prestamos.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No hay préstamos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PrestamosList;