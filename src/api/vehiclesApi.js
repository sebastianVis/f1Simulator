const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json",
});


//                          OBTENER LOS DATOS DE LOS VEHICULOS

const getVehicles = async () => {
    try {
        const respuesta = await fetch(`${URL_API}/vehiculos`);
        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.staatusText}`);
        }
        const datos = await respuesta.json();
        // console.log(datos);
        return datos;
    } catch (error) {
        console.error("Error en la petición:", error.message);
        return []
    }
};

// usar  getVehicles
// getVehicles(); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                             AGREGAR UN VEHICULO (estructura basica)

const postVehicles = async (data) => {
    try {
        const vehicles = await getVehicles();

        const respuesta = await fetch(`${URL_API}/vehiculos`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
        })

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        } else if (respuesta.ok) {
            console.log("se envio la info")
        }

    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
};

// const newVehicle =     {
//     "equipo": "Red Bull Racing",
//     "modelo": "RB20",
//     "motor": "Honda",
//     "velocidad_maxima_kmh": 360,
//     "aceleracion_0_100": 2.5,
//     "pilotos": [
//       1,
//       2
//     ],
//     "rendimiento": {
//       "conduccion_normal": {
//         "velocidad_promedio_kmh": 320,
//         "consumo_combustible": {
//           "seco": 1.9,
//           "lluvioso": 2.1,
//           "extremo": 2.4
//         },
//         "desgaste_neumaticos": {
//           "seco": 1.5,
//           "lluvioso": 0.8,
//           "extremo": 2.5
//         }
//       }
//     },
//     "imagen": "https://upload.wikimedia.org/wikipedia/commons/8/89/Max_Verstappen_2023_Austria_FP2_%28cropped%29.jpg"
//   }
// postVehicles(newVehicle)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                          ACTUALIZAR LOS VEHICULOS

const patchVehicle = async (id, data) => {
    try {
        const respuesta = await fetch(`${URL_API}/vehiculos/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(data),
        });

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        } else if (respuesta.ok) {
            console.log("se envio la path info")
        }     

    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
};

patchVehicle("d6df", { modelo: "RB21", motor: "Honda V6", pilotos: [3,9]}); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                          ACTUALIZAR LOS VEHICULOS

const deletVehicle = async (id) => {
    try {
        const response = await fetch(`${URL_API}/vehiculos/${id}`,
            {
                method: "DELETE",
                headers: myHeaders,
            }
        )

        if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        } else if (respuesta.ok) {
            console.log("se elimino la info")
        }

    } catch (error) {

    }
}

// deletVehicle()



