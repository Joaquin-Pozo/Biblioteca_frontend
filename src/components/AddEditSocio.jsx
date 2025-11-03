import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import socioService from "../services/socio.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { Container, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddEditSocio = () => {
    const [identificador, setIdentificador] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [estadoSocio, setEstadoSocio] = useState("");
    const [fechaInscripcion, setFechaInscripcion] = useState("");
    const { id } = useParams();
    const [titleSocioForm, setTitleSocioForm] = useState("");

    // Estado para Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const saveSocio = (e) => {
        e.preventDefault();
        const socio = { identificador, nombreCompleto, correo, telefono, fechaInscripcion, estadoSocio };

        if (id) {
            // Actualizar socio
            socioService
                .update(id, socio)
                .then((response) => {
                    console.log("Socio actualizado:", response.data);
                    setSnackbarMessage("Socio actualizado correctamente.");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    setTimeout(() => navigate("/socio/list"), 1500);
                })
                .catch((error) => {
                    console.error("Error al actualizar socio:", error);
                    setSnackbarMessage("Error al actualizar socio.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                });
        } else {
            // Crear socio
            socioService
                .create(socio)
                .then((response) => {
                    console.log("Socio creado:", response.data);
                    setSnackbarMessage("Socio creado correctamente.");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    setTimeout(() => navigate("/socio/list"), 1500);
                })
                .catch((error) => {
                    console.error("Error al crear socio:", error);
                    setSnackbarMessage("Error al crear socio.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleSocioForm("Editar Socio");
            socioService
                .get(id)
                .then((response) => {
                    const socio = response.data;
                    setIdentificador(socio.identificador);
                    setNombreCompleto(socio.nombreCompleto);
                    setTelefono(socio.telefono);
                    setCorreo(socio.correo);
                    setEstadoSocio(socio.estadoSocio);
                    setFechaInscripcion(socio.fechaInscripcion);
                })
                .catch((error) => {
                    console.log("Se ha producido un error al obtener socio:", error);
                });
        } else {
            setTitleSocioForm("Nuevo Socio");
        }
    }, [id]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            sx={{ maxWidth: 500, mx: "auto", mt: 5 }}
        >
            <h3>{titleSocioForm}</h3>
            <hr />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="rut"
                    label="RUT"
                    value={identificador}
                    variant="standard"
                    onChange={(e) => setIdentificador(e.target.value)}
                    helperText="Ej. 12.587.698-8"
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="nombre"
                    label="Nombre Completo"
                    value={nombreCompleto}
                    variant="standard"
                    onChange={(e) => setNombreCompleto(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="correo"
                    label="Correo"
                    value={correo}
                    variant="standard"
                    onChange={(e) => setCorreo(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="telefono"
                    label="Teléfono"
                    value={telefono}
                    variant="standard"
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="fechaInscripcion"
                    label="Fecha de Inscripción"
                    type="date"
                    value={fechaInscripcion}
                    variant="standard"
                    onChange={(e) => setFechaInscripcion(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="estado"
                    label="Estado"
                    select
                    value={estadoSocio}
                    variant="standard"
                    onChange={(e) => setEstadoSocio(e.target.value)}
                >
                    <MenuItem value="disponible">Disponible</MenuItem>
                    <MenuItem value="restringido">Restringido</MenuItem>
                    <MenuItem value="suspendido">Suspendido</MenuItem>
                </TextField>
            </FormControl>

            <Button
                variant="contained"
                color="info"
                onClick={saveSocio}
                startIcon={<SaveIcon />}
                sx={{ mt: 2 }}
            >
                Grabar
            </Button>

            <Box sx={{ mt: 2 }}>
                <Link to="/socio/list">Volver al listado</Link>
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

export default AddEditSocio;
