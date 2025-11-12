import httpClient from "../http-common";

//traer todos los libros
const getAll = () => {
    return httpClient.get('/libro');
}

//Traer libro por id
const get = id => {
    return httpClient.get(`/libro/${id}`);
}
//Crear libro
const create = data => {
    return httpClient.post("/libro", data);
}

//Actualizar libro
const update = (id, data) => {
    return httpClient.put(`/libro/${id}`, data);
}

// Buscar libros por título
const buscarPorTitulo = (titulo) => {
  return httpClient.get(`/libro/buscar`, { params: { titulo } });
};

// Buscar libros por autor
const buscarPorAutor = (autor) => {
  return httpClient.get(`/libro/buscarPorAutor`, { params: { autor } });
};

/*
//Dar de baja libro
const unsubscribeTool = id => {
    return httpClient.put(`/api/tools/${id}/unsubscribe`);
}

//Traer unidades de libro por estado
const getLibroUnitsByState = data => {
    return httpClient.get("/api/tools/units", {
        params:{
            state:'DISPONIBLE'
        },
    });
}*/

//, create, get, unsubscribeTool, getToolUnitsByState
export default { getAll, get, create, update, buscarPorTitulo, buscarPorAutor };