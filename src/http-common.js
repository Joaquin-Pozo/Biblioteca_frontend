import axios from "axios";

const libraryBackendServer = import.meta.env.VITE_LIBRARY_BACKEND_SERVER;
const libraryBackendPort = import.meta.env.VITE_LIBRARY_BACKEND_PORT;

export default axios.create({
    baseURL: `http://${libraryBackendServer}:${libraryBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});