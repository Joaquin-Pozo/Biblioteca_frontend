import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import libroService from "../services/libro.service";
import autorService from "../services/autorService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddEditLibro = () => {
    const [titulo, setTitulo] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");
    const [editorial, setEditorial] = useState("");
    const [anioPublicacion, setAnioPublicacion] = useState("");
    const [autorId, setAutorId] = useState("");
    const [autores, setAutores] = useState([]);
    const { id } = useParams();
    const [titleLibroForm, setTitleLibroForm] = useState("");

    // Estado para Snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const saveLibro = (e) => {
        e.preventDefault();
        const libro = { titulo, cantidad, categoria, editorial, anioPublicacion, autor: {id:autorId }};

        if (id) {
            // Actualizar libro
            libroService
                .update(id, libro)
                .then((response) => {
                    console.log("Libro actualizado:", response.data);
                    setSnackbarMessage("Libro actualizado correctamente.");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    setTimeout(() => navigate("/libro/list"), 1500);
                })
                .catch((error) => {
                    console.error("Error al actualizar libro:", error);
                    setSnackbarMessage("Error al actualizar libro.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                });
        } else {
            // Crear libro
            libroService
                .create(libro)
                .then((response) => {
                    console.log("Libro creado:", response.data);
                    setSnackbarMessage("Libro creado correctamente.");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    setTimeout(() => navigate("/libro/list"), 1500);
                })
                .catch((error) => {
                    console.error("Error al crear Libro:", error);
                    setSnackbarMessage("Error al crear Libro.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleLibroForm("Editar Libro");
            libroService
                .get(id)
                .then((response) => {
                    const libro = response.data;
                    setTitulo(libro.titulo);
                    setCategoria(libro.categoria);
                    setEditorial(libro.editorial);
                    setAnioPublicacion(libro.anioPublicacion);
                    setAutorId(libro.autor?.id || "");
                    
                })
                .catch((error) => {
                    console.log("Se ha producido un error al obtener libro:", error);
                });
        } else {
            setTitleLibroForm("Nuevo libro");
        }
    }, [id]);

    /* Cargar Autores */
    useEffect (() => {
        autorService
        .getAll()
        .then((response) => {  
            setAutores(response.data);
        })
        .catch((error) => {
        console.error("Error al cargar autores:", error);
        });
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            sx={{ maxWidth: 500, mx: "auto", mt: 5 }}
        >
            <h3>{titleLibroForm}</h3>
            <hr />
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="titulo"
                label="Título"
                    value={titulo}
                    variant="standard"
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="categoria"
                    label="Categoria"
                    select
                    value={categoria}
                    variant="standard"
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <MenuItem value="Novela">Novela</MenuItem>
                    <MenuItem value="Drama">Drama</MenuItem>
                    <MenuItem value="Terror">Terror</MenuItem>
                    <MenuItem value="Ficción">Ficción</MenuItem>
                    <MenuItem value="Historia">Historia</MenuItem>
                    <MenuItem value="Poesia">Poesía</MenuItem>
                </TextField>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="editorial"
                    label="Editorial"
                    value={editorial}
                    variant="standard"
                    onChange={(e) => setEditorial(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="anioPublicacion"
                    label="Año de Publicación"
                    value={anioPublicacion}
                    variant="standard"
                    onChange={(e) => setAnioPublicacion(e.target.value)}
                />
            </FormControl>

           {/* Carga Autor en combo  */}
            <FormControl fullWidth>
              <TextField
                id="autor"
                label="Seleccionar Autor"
                value={autorId}
                select
                variant="standard"
                onChange={(e) => setAutorId(e.target.value)}
                style={{ width: "50%" }}
              >
                {autores.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.nombreCompleto}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="cantidad"
                    label="Cantidad"
                    value={cantidad}
                    variant="standard"
                    onChange={(e) => setCantidad(e.target.value)}
                />
            </FormControl>

            <Button
                variant="contained"
                color="info"
                onClick={saveLibro}
                startIcon={<SaveIcon />}
                sx={{ mt: 2 }}
            >
                Grabar
            </Button>

            <Box sx={{ mt: 2 }}>
                <Link to="/libro/list">Volver al listado</Link>
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

export default AddEditLibro;
