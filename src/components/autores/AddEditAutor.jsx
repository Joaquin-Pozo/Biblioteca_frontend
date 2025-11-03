import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import autorService from "../../services/autorService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddEditAutor = () => {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [id, setId] = useState(null);
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [titleForm, setTitleForm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const saveAutor = (e) => {
    e.preventDefault();
    const autor = { nombreCompleto, nacionalidad, fechaNacimiento };

    if (paramId) {
      autorService
        .update(paramId, autor)
        .then(() => {
          setSnackbarMessage("Autor actualizado correctamente.");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/autor/list"), 1500);
        })
        .catch(() => {
          setSnackbarMessage("Error al actualizar autor.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    } else {
      autorService
        .create(autor)
        .then(() => {
          setSnackbarMessage("Autor creado correctamente.");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/autor/list"), 1500);
        })
        .catch(() => {
          setSnackbarMessage("Error al crear autor.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  };

  useEffect(() => {
    if (paramId) {
      setTitleForm("Editar Autor");
      autorService
        .get(paramId)
        .then((response) => {
          const autor = response.data;
          setId(autor.id);
          setNombreCompleto(autor.nombreCompleto);
          setNacionalidad(autor.nacionalidad);
          setFechaNacimiento(autor.fechaNacimiento);
        })
        .catch((error) => console.log("Error al obtener autor:", error));
    } else {
      setTitleForm("Nuevo Autor");
    }
  }, [paramId]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      sx={{ maxWidth: 500, mx: "auto", mt: 5 }}
    >
      <h3>{titleForm}</h3>
      <hr />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="nombreCompleto"
          label="Nombre Completo"
          value={nombreCompleto}
          variant="standard"
          onChange={(e) => setNombreCompleto(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="nacionalidad"
          label="Nacionalidad"
          value={nacionalidad}
          variant="standard"
          onChange={(e) => setNacionalidad(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          value={fechaNacimiento}
          variant="standard"
          onChange={(e) => setFechaNacimiento(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      <Button
        variant="contained"
        color="info"
        onClick={saveAutor}
        startIcon={<SaveIcon />}
        sx={{ mt: 2 }}
      >
        Grabar
      </Button>

      <Box sx={{ mt: 2 }}>
        <Link to="/autor/list">Volver al listado</Link>
      </Box>

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

export default AddEditAutor;