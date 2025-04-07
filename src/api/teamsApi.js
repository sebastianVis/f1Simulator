const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json",
});

//                          OBTENER LOS DATOS DE LOS EQUIPOS
const getTeams = async () => {S
    try {

        const respuesta = await fetch(`${URL_API}/teams`);
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error en la petición:", error.message);
        return [];
    }
};

//                          AGREGAR UN EQUIPO
const postTeam = async (data) => {
    try {
        const respuesta = await fetch(`${URL_API}/teams`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        console.log("Equipo agregado exitosamente");
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
};

//                          OBTENER LOS DATOS DE LOS EQUIPOS
const patchTeam = async (id, data) => {
    try {
        const respuesta = await fetch(`${URL_API}/teams/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(data),
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        console.log("Equipo actualizado exitosamente");
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
};

//                          ELIMINAR UN EQUIPO

const deleteTeam = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/teams/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        console.log("Equipo eliminado exitosamente");
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
};

export { getTeams, postTeam, patchTeam, deleteTeam };