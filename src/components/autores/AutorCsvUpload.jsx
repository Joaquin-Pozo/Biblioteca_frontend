import { useState, useRef } from "react";
import { Button, Box, Typography, Alert, Stack, Divider, Paper,} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const API_BASE_URL = `http://${import.meta.env.VITE_LIBRARY_BACKEND_SERVER}:${import.meta.env.VITE_LIBRARY_BACKEND_PORT}`;
const ETL_AUTORES_URL = `${API_BASE_URL}/autor/etl/upload`;

export default function AutorCsvUpload({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0] || null;
    setFile(selectedFile);
    setResult(null);
    setErrorMsg("");
    setSuccessMsg(
      selectedFile ? `Archivo seleccionado: ${selectedFile.name}` : ""
    );
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Primero selecciona un archivo CSV.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setErrorMsg("");
      setResult(null);
      setSuccessMsg("");

      const response = await fetch(ETL_AUTORES_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const data = await response.json();
      setResult(data);
      setSuccessMsg("✅ Autores cargados correctamente.");
      setFile(null);
      fileInputRef.current.value = "";

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Error al cargar el archivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0} // ✅ SIN SOMBRA
      sx={{
        p: 2,
        pb: 1, // ✅ MENOS PADDING ABAJO
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        mt: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Carga masiva de autores (CSV)
      </Typography>

      {/* ✅ CONTENEDOR EN DOS COLUMNAS */}
      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
        
        {/* ✅ COLUMNA IZQUIERDA: BOTONES + MENSAJES */}
        <Box sx={{ minWidth: 280 }}>
          <Stack spacing={1.2}>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Button
              variant="contained"
              color="secondary"
              startIcon={<GroupAddIcon />}
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
            >
              Seleccionar CSV
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? "Cargando..." : "Subir y procesar"}
            </Button>

            {file && (
              <Alert severity="info" sx={{ py: 0.5 }}>
                📄 {file.name}
              </Alert>
            )}

            {errorMsg && (
              <Alert severity="error" sx={{ py: 0.5 }}>
                {errorMsg}
              </Alert>
            )}

            {successMsg && (
              <Alert severity="success" sx={{ py: 0.5 }}>
                {successMsg}
              </Alert>
            )}
          </Stack>
        </Box>

        {/* ✅ COLUMNA DERECHA: RESULTADO ETL */}
        {result && (
          <Box sx={{ flex: 1 }}>
            <Divider sx={{ mb: 1 }} />

            <Typography variant="subtitle1" fontWeight="bold">
              Resultado del ETL
            </Typography>

            <Typography>Total filas: {result.totalFilas}</Typography>
            <Typography color="success.main">
              Insertadas: {result.filasInsertadas}
            </Typography>
            <Typography color="warning.main">
              Actualizadas: {result.filasActualizadas}
            </Typography>
            <Typography color="error.main">
              Con error: {result.filasConError}
            </Typography>

            {result.errores?.length > 0 && (
              <Box mt={1}>
                <Typography variant="subtitle2" color="error">
                  Detalle de errores:
                </Typography>
                <ul style={{ marginTop: 4 }}>
                  {result.errores.map((err, index) => (
                    <li key={index}>
                      Fila {err.fila}: {err.mensaje}
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
