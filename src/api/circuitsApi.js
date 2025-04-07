const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json",
});

//                          OBTENER LOS DATOS DE LOS CIRCUITOS
const getCircuits = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/circuits`);

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

//                          AGREGAR UN CIRCUITO
const postCircuit = async (data) => {
    try {

        const respuesta = await fetch(`${URL_API}/circuits`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        console.log("Circuito agregado exitosamente");
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
};

//                          ACTUALIZAR UN CIRCUITO
const patchCircuit = async (id, data) => {
    try {
        const respuesta = await fetch(`${URL_API}/circuits/${id}`, {

            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(data),
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        console.log("Circuito actualizado exitosamente");
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
};

//                          ELIMINAR UN CIRCUITO
const deleteCircuit = async (id) => {
    try {
        const respuesta = await fetch(`${URL_API}/circuits/${id}`, {

            method: "DELETE",
            headers: myHeaders,
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }
        console.log("Circuito eliminado exitosamente");
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
};

export { getCircuits, postCircuit, patchCircuit, deleteCircuit };