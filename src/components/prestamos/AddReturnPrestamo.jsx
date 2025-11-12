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
  const [libros, setLibros] = useState([]);

  const [socioId, setSocioId] = useState("");
  const [libroId, setLibroId] = useState("");
  const [copiaSeleccionada, setCopiaSeleccionada] = useState(null);
  const [fechaPactadaDevolucion, setFechaPactadaDevolucion] = useState("");
  const [daniado, setDaniado] = useState(false);
  const [multa, setMulta] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  // Snackbar (para mostrar mensajes de éxito o error)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // Guarda el préstamo o devolución
  const savePrestamo = (e) => {
    e.preventDefault();

    const prestamo = {
      id,
      socio: { id: socioId },
      copia: { id: copiaSeleccionada?.id },
      fechaPactadaDevolucion,
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
            console.log("Respuesta del backend:", response);
            console.log("Prestamo a enviar:", prestamo);

            // Verificar si la respuesta trae un mensaje de error o un objeto válido
            if (typeof response.data === "string") {
              // El backend devolvió un mensaje (no un objeto)
              setSnackbarMessage(response.data);
              setSnackbarSeverity("warning");
              
            } else {
              // El backend devolvió un objeto (éxito)
              setSnackbarMessage("Préstamo registrado correctamente.");
              setSnackbarSeverity("success");
              setTimeout(() => navigate("/prestamo/list"), 1500);
            }
            setOpenSnackbar(true);
          })
          .catch((error) => {
            console.log("Prestamo a enviar:", prestamo);
            console.error("Error al registrar préstamo:", error);
            setSnackbarMessage("Error al registrar préstamo.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
          });
    }
  };

  useEffect(() => {
    socioService.getAll().then((res) => setSocios(res.data));
    copiaService.getAll().then((res) => {
      console.log("Copias desde backend:", res.data);
      const todasCopias = res.data;

      // Agrupa las copias por libro y se queda solamente con los títulos únicos
      const librosUnicos = [];
      const titulosVistos = new Set();

      todasCopias.forEach((c) => {
        if (c.libro && !titulosVistos.has(c.libro.id)) {
          librosUnicos.push(c.libro);
          titulosVistos.add(c.libro.id);
        }
      });

      setCopias(todasCopias);
      setLibros(librosUnicos);
    });

    if (id) {
      setTitle("Registrar Devolución");
      prestamoService
        .get(id)
        .then((res) => {
          const prestamo = res.data;
          setSocioId(prestamo.socio?.id);
          setLibroId(prestamo.copia?.libro?.id);
          setCopiaSeleccionada(prestamo.copia);
          setFechaPactadaDevolucion(prestamo.fechaPactadaDevolucion);
          setDaniado(prestamo.daniado || false);
          setMulta(prestamo.multa || "");
        })
        .catch((error) => console.error("Error al obtener préstamo:", error));
    } else {
      setTitle("Registrar Préstamo");
    }
  }, [id]);

  const disabledFields = Boolean(id);

  // Cuando se elige un libro, selecciona la primera copia disponible
  const handleLibroChange = (libroSeleccionado) => {
  setLibroId(libroSeleccionado);

  // Filtra las copias que pertenezcan a este libro
  const copiasDeEsteLibro = copias.filter(
    (c) => c.libro?.id === libroSeleccionado
  );

  console.log("Copias de este libro:", copiasDeEsteLibro);

  // Busca una copia con estado "DISPONIBLE" (en cualquier formato)
  const copiaDisponible = copiasDeEsteLibro.find((c) => {
    const estado = (c.estado || c.estadoCopia || "").toLowerCase();
    return estado === "disponible";
  });

  if (copiaDisponible) {
    setCopiaSeleccionada(copiaDisponible);
    console.log("Copia seleccionada:", copiaDisponible);
  } else {
    setCopiaSeleccionada(null);
    setSnackbarMessage("No hay copias disponibles para este libro.");
    setSnackbarSeverity("warning");
    setOpenSnackbar(true);
  }
};

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

      {/* Libro */}
      <FormControl fullWidth variant="standard">
        <InputLabel id="libro-label">Libro</InputLabel>
        <Select
          labelId="libro-label"
          id="libroId"
          value={libroId}
          onChange={(e) => handleLibroChange(e.target.value)}
          required
          disabled={disabledFields}
        >
          {libros.map((libro) => (
            <MenuItem key={libro.id} value={libro.id}>
              {libro.titulo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Muestra el código de barras de la copia seleccionado (solo lectura) */ }
      <TextField
      label="Copia seleccionada (código de barras)"
      value={copiaSeleccionada?.codigoBarras || "Ninguna copia seleccionada"}
      variant="standard"
      fullWidth
      disabled
      />

      {/* Fecha pactada devolución */}
      {!id && (
        <TextField
          id="fechaPactadaDevolucion"
          label="Fecha pactada devolución"
          type="date"
          value={fechaPactadaDevolucion}
          onChange={(e) => setFechaPactadaDevolucion(e.target.value)}
          variant="standard"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
      )}

      {/* Campos visibles solo en devolución */}
      {id && (
        <>
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

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddReturnPrestamo;