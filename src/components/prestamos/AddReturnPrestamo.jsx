import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import prestamoService from "../../services/prestamoService";
import socioService from "../../services/socio.service";
import copiaService from "../../services/copia.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddReturnPrestamo = () => {
  const [socios, setSocios] = useState([]);
  const [copias, setCopias] = useState([]);

  const [socioId, setSocioId] = useState("");
  const [copiaId, setCopiaId] = useState("");
  const [fechaPrestamo, setFechaPrestamo] = useState("");
  const [fechaPactadaDevolucion, setFechaPactadaDevolucion] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [daniado, setDaniado] = useState(false);
  const [multa, setMulta] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  // Snackbar (para mostrar mensajes de éxito o error)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const savePrestamo = (e) => {
    e.preventDefault();

    const prestamo = {
      id,
      socio: { id: socioId },
      copia: { id: copiaId },
      fechaPrestamo,
      fechaPactadaDevolucion,
      fechaDevolucion,
      daniado,
      multa,
    };

    if (id) {
      // Registrar devolución
      prestamoService
        .returnLoan(id, prestamo)
        .then((response) => {
          setSnackbarMessage("Devolución registrada correctamente.");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/prestamo/list"), 1500);
        })
        .catch((error) => {
          console.error("Error al registrar devolución:", error);
          setSnackbarMessage("Error al registrar devolución.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    } else {
      // Crear nuevo préstamo
      prestamoService
        .create(prestamo)
        .then((response) => {
          setSnackbarMessage("Préstamo registrado correctamente.");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/prestamo/list"), 1500);
        })
        .catch((error) => {
          console.error("Error al registrar préstamo:", error);
          setSnackbarMessage("Error al registrar préstamo.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  };

  useEffect(() => {
    socioService.getAll().then((res) => setSocios(res.data));
    copiaService.getAll().then((res) => setCopias(res.data));

    if (id) {
      setTitle("Registrar Devolución");
      prestamoService
        .get(id)
        .then((res) => {
          const prestamo = res.data;
          setSocioId(prestamo.socio?.id);
          setCopiaId(prestamo.copia?.id);
          setFechaPrestamo(prestamo.fechaPrestamo);
          setFechaPactadaDevolucion(prestamo.fechaPactadaDevolucion);
          setFechaDevolucion(prestamo.fechaDevolucion || "");
          setDaniado(prestamo.daniado || false);
          setMulta(prestamo.multa || "");
        })
        .catch((error) => {
          console.error("Error al obtener préstamo:", error);
        });
    } else {
      setTitle("Registrar Préstamo");
    }
  }, [id]);

  const disabledFields = Boolean(id); // Deshabilita campos al devolver

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2, width: "400px", mx: "auto", mt: 5 }}
    >
      <h3>{title}</h3>

      {/* Socio */}
      <FormControl fullWidth variant="standard">
        <InputLabel id="socio-label">Socio</InputLabel>
        <Select
          labelId="socio-label"
          id="socioId"
          value={socioId}
          onChange={(e) => setSocioId(e.target.value)}
          required
          disabled={disabledFields}
        >
          {socios.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.nombreCompleto}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Copia */}
      <FormControl fullWidth variant="standard">
        <InputLabel id="copia-label">Libro</InputLabel>
        <Select
          labelId="copia-label"
          id="copiaId"
          value={copiaId}
          onChange={(e) => setCopiaId(e.target.value)}
          required
          disabled={disabledFields}
        >
          {copias.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.libro?.titulo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Fechas */}
      <TextField
        id="fechaPrestamo"
        label="Fecha de préstamo"
        type="date"
        value={fechaPrestamo}
        onChange={(e) => setFechaPrestamo(e.target.value)}
        variant="standard"
        fullWidth
        required
        disabled={disabledFields}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        id="fechaPactadaDevolucion"
        label="Fecha pactada devolución"
        type="date"
        value={fechaPactadaDevolucion}
        onChange={(e) => setFechaPactadaDevolucion(e.target.value)}
        variant="standard"
        fullWidth
        required
        disabled={disabledFields}
        InputLabelProps={{ shrink: true }}
      />

      {id && (
        <>
          <TextField
            id="fechaDevolucion"
            label="Fecha efectiva devolución"
            type="date"
            value={fechaDevolucion}
            onChange={(e) => setFechaDevolucion(e.target.value)}
            variant="standard"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="daniado"
            select
            label="¿Libro dañado?"
            value={daniado ? 1 : 0}
            onChange={(e) => setDaniado(Number(e.target.value) === 1)}
            variant="standard"
            fullWidth
            required
          >
            <MenuItem value={0}>No</MenuItem>
            <MenuItem value={1}>Sí</MenuItem>
          </TextField>

          <TextField
            id="multa"
            label="Multa (CLP$)"
            type="number"
            value={multa}
            disabled
            variant="standard"
            fullWidth
          />
        </>
      )}

      <Button
        variant="contained"
        color="info"
        onClick={savePrestamo}
        startIcon={<SaveIcon />}
        sx={{ mt: 2 }}
      >
        Guardar
      </Button>

      <Box sx={{ mt: 2 }}>
        <Link to="/prestamo/list">Volver al listado</Link>
      </Box>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddReturnPrestamo;