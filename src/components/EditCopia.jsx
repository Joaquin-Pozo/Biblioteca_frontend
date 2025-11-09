import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import copiaService from "../services/copia.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import libroService from "../services/libro.service";

const EditCopia = () => {
  
    const [estadoCopia, setEstadoCopia] = useState("");
    const [codigoBarras, setCodigoBarras] = useState("");
    const [fechaAdquisicion, setFechaAdquisicion] = useState("");
    const [libroId, setLibroId] = useState("");
    const [libros, setLibros] = useState([]);
    const { id } = useParams();

    // Estado para Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // cargaar libros para seleccionar
    useEffect(() => {
    libroService
        .getAll()
        .then((response) => {
        setLibros(response.data);
        })
        .catch((error) => {
        console.log("Error al cargar los libros:", error);
        });
    }, []);
    

    const saveCopia = (e) => {
        e.preventDefault();
        const copia = {codigoBarras, fechaAdquisicion, estadoCopia, libro: {id:libroId }};
            // Actualizar copia de libro
            console.log("Objeto enviado al backend:", copia);
            copiaService
                .update(id, copia)
                .then((response) => {
                    console.log("Copia de libro actualizado:", response.data);
                    setSnackbarMessage("Copia de libro actualizado correctamente.");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    setTimeout(() => navigate("/copia/list"), 1500);
                })
                .catch((error) => {
                    console.error("Error al actualizar copia de libro:", error);
                    setSnackbarMessage("Error al actualizar copia de libro.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                });
       
    };

    useEffect(() => {
        if (id) {
            copiaService
                .get(id)
                .then((response) => {
                    const copia = response.data;
                    setCodigoBarras(copia.codigoBarras);
                    setFechaAdquisicion(copia.fechaAdquisicion);
                    setEstadoCopia(copia.estadoCopia);
                    setLibroId(copia.libro?.id || "");
                })
                .catch((error) => {
                    console.log("Se ha producido un error al obtener la copia de libro:", error);
                });
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
            <h3>Copias de libros</h3>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label="Libro asociado"
                    value={libros.find(l => l.id === libroId)?.titulo || ""}
                    variant="standard"
                    InputProps={{
                    readOnly: true,
                    }}
                />
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="codigoBarras"
                label="Código de Barras"
                    value={codigoBarras}
                    variant="standard"
                    onChange={(e) => setCodigoBarras(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="fechaAdquisicion"
                label="Fecha de Adquisición"
                    value={fechaAdquisicion}
                    variant="standard"
                    onChange={(e) => setFechaAdquisicion(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="estadoCopia"
                    label="Estado de la Copia"
                    select
                    value={estadoCopia}
                    variant="standard"
                    onChange={(e) => setEstadoCopia(e.target.value)}
                >
                    <MenuItem value="disponible">Disponible</MenuItem>
                    <MenuItem value="prestado">Prestado</MenuItem>
                    <MenuItem value="reparación">Reparacion</MenuItem>
                    <MenuItem value="perdido">Perdido</MenuItem>
                </TextField>
            </FormControl>

            <Button
                variant="contained"
                color="info"
                onClick={saveCopia}
                startIcon={<SaveIcon />}
                sx={{ mt: 2 }}
            >
                Grabar
            </Button>

            <Box sx={{ mt: 2 }}>
                <Link to="/copia/list">Volver al listado</Link>
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

export default EditCopia;