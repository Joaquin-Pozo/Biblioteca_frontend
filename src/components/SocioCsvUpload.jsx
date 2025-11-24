import { useState } from "react";

// Armamos la URL base del backend usando las variables .env de Vite
const API_BASE_URL = `http://${import.meta.env.VITE_LIBRARY_BACKEND_SERVER}:${import.meta.env.VITE_LIBRARY_BACKEND_PORT}`;
const ETL_SOCIOS_URL = `${API_BASE_URL}/socio/etl/upload`;

export default function SocioCsvUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0] || null);
    setResult(null);
    setErrorMsg("");
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Primero selecciona un archivo CSV.");
      return;
    }

    const formData = new FormData();
    // El nombre "file" debe coincidir con @RequestParam("file") en el backend
    formData.append("file", file);

    try {
      setLoading(true);
      setErrorMsg("");
      setResult(null);

      const response = await fetch(ETL_SOCIOS_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${text}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Ocurrió un error al cargar el archivo. Revisa la consola del navegador.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
      <h3>Carga masiva de socios (CSV)</h3>

      <div style={{ marginBottom: "0.5rem" }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Cargando..." : "Subir CSV y procesar"}
      </button>

      {errorMsg && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>
          {errorMsg}
        </p>
      )}

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Resultado del ETL</h4>
          <p>Total filas: {result.totalFilas}</p>
          <p>Filas insertadas: {result.filasInsertadas}</p>
          <p>Filas actualizadas: {result.filasActualizadas}</p>
          <p>Filas con error: {result.filasConError}</p>

          {result.errores && result.errores.length > 0 && (
            <div style={{ marginTop: "0.5rem" }}>
              <h5>Detalle de errores:</h5>
              <ul>
                {result.errores.map((err, index) => (
                  <li key={index}>
                    Fila {err.fila}: {err.mensaje}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
