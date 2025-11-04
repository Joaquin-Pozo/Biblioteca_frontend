import httpClient from "../http-common";


//traer todos los libros
const getAll = () => {
    return httpClient.get('/libro');
}

/*
//Traer libro por id
const get = id => {
    return httpClient.get(`/api/tools/${id}`);
}
//Crear libro
const create = data => {
    return httpClient.post("/api/tools/", data);
}
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
export default { getAll};