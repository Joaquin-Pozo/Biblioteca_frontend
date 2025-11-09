import httpClient from "../http-common";

// obtiene todos los prestamos
const getAll = () => {
    return httpClient.get("/prestamo");
}
// obtiene un prestamo por id
const get = (id) => {
    return httpClient.get(`/prestamo/${id}`);
}
// registra un nuevo prestamo
const create = (data) => {
    return httpClient.post("/prestamo", data);
}
// devuelve un prestamo
const returnLoan = (id, data) => {
    return httpClient.put(`/prestamo/devolver/${id}`, data);
}

export default { getAll, get, create, returnLoan };