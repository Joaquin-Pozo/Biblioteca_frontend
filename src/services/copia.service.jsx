import httpClient from "../http-common";

//traer todas las copias de libros
const getAll = () => {
    return httpClient.get('/copia');
}

//Traer copia por id
const get = id => {
    return httpClient.get(`/copia/${id}`);
}

//Crear copia
const create = data => {
    return httpClient.post("/copia", data);
}

//Actualizar copia
const update = (id, data) => {
    return httpClient.put(`/copia/${id}`, data);
}

//Eliminar copia por id
const remove = (id) => {
    return httpClient.put(`/copia/eliminar/${id}`);
}

//Reparar copia por id
const repair = (id) => {
    return httpClient.put(`/copia/reparar/${id}`);
}

export default { getAll, get, create, update, remove, repair };