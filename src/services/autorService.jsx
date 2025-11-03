import httpClient from "../http-common";

// Obtiene todos los autores
const getAll = () => {
    return httpClient.get("/autor");
}

// Obtiene un autor por id
const get = (id) => {
    return httpClient.get(`/autor/${id}`);
}

// Crea autor
const create = (data) => {
    return httpClient.post("/autor", data);
}

// Actualiza a un autor
const update = (id, data) => {
    return httpClient.put(`/autor/${id}`, data);
}

// Elimina autor
const remove = (id) => {
    return httpClient.delete(`/autor/${id}`);
}

export default ( getAll, get, create, update, remove );