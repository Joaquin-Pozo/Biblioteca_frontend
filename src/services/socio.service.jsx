import httpClient from "../http-common";

//traer todos los socios
const getAll = () => {
    return httpClient.get('/socio');
}

//Traer socio por id
const get = id => {
    return httpClient.get(`/socio/${id}`);
}

//Crear socio
const create = data => {
    return httpClient.post("/socio", data);
}

//Actualizar socio
const update = (id, data) => {
    return httpClient.put(`/socio/${id}`, data);
}

//Eliminar socio por id
const remove = (id) => {
    return httpClient.delete(`/socio/${id}`);
}

export default { getAll, get, create, update, remove };