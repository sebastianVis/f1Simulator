class EditarCarros extends HTMLElement{
    constructor(){
        super();

    }

    connectedCallback(){
        this.innerHTML= `
        <style>
        @import '/src/css/editStyleForm.css'
        </style>

        <div class="formEdit">
            <form id="myformEditCar">
                <div class="containerTitle">
                    <h1 style="text-align: center;">Edit Car</h1>
                </div>
        
                <div class="containerInfo">

                <div class="container">
                    <label for="model">Search vehicle:</label>
                    <input type="text" id="searchCar" required>
                </div>

                <div class="container">
                    <label for="id">Car ID:</label>
                    <input type="text" name="id" disabled>
                </div>

                <div class="container">
                    <label for="model">Car model:</label>
                    <input type="text" name="model">
                </div>

                <div class="container">
                    <label for="motor">Car Motor:</label>
                    <input type="text" name="motor">
                </div>

                <div class="container">
                    <label for="acceleration_ZtoH">Acceleration Zero to Hundred:</label>
                    <input type="text" name="acceleration_ZtoH">
                </div>

                <div class="container">
                    <label for="max_speed_kmh">Max. Speed (Km/h):</label>
                    <input type="text" name="max_speed_kmh">
                </div>
                
                <div class="container">
                    <label for="average_Speed">Average Speed (Km/h):</label>
                    <input type="text" name="average_Speed">
                </div>
                
                <div class="container">
                    <label for="fuel_consumption_dry">Fuel consumption (dry):</label>
                    <input type="text" name="fuel_consumption_dry">
                </div>

                <div class="container">
                    <label for="fuel_consumption_rainy">Fuel consumption (rainy):</label>
                    <input type="text" name="fuel_consumption_rainy">
                </div>
                
                <div class="container">
                    <label for="fuel_consumption_extreme">Fuel consumption (extreme):</label>
                    <input type="text" name="fuel_consumption_extreme">
                </div>
                
                <div class="container">
                    <label for="tire_wear_dry">Tire Wear (dry):</label>
                    <input type="text" name="tire_wear_dry">
                </div>

                <div class="container">
                    <label for="tire_wear_rainy">Tire Wear (rainy):</label>
                    <input type="text" name="tire_wear_rainy">
                </div>
                
                <div class="container">
                    <label for="tire_wear_extreme">Tire Wear (extreme):</label>
                    <input type="text" name="tire_wear_extreme">
                </div>
                
                <div class="container">
                    <label for="img">Car image:</label>
                    <input type="text" name="img">
                </div>
                </div>
                <div class="containerButton">
                    <button type="submit">Submit</button>
                </div>
      
            </form>
          </div>
            `;

    const appMain = document.querySelector('#main');

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "15";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 15) {
        btnBack.dataset.ed = "5";
        appMain.innerHTML = `<manage-cars></manage-cars>`;
      }
    });
    
        this.querySelector("#searchCar").addEventListener('input', async(e)=>{
            let textSearch = e.target.value;
            const result = await this.searchCar(textSearch);
            if(result){
                this.editForm(result);
            } else {
                this.clearForm();
            }
        })

        this.querySelector("#myformEditCar").addEventListener('submit', (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            let carID = this.querySelector('input[name="id"]').value;
            const structuredData = {
                "id": carID,
                "model": data.model,
                "motor": data.motor,
                "performance": {
                    "acceleration_ZtoH": data.acceleration_ZtoH,
                    "max_speed_kmh": data.max_speed_kmh,
                    "average_Speed": data.average_Speed,
                    "fuel_consumption": {
                        "dry": data.fuel_consumption_dry,
                        "rainy": data.fuel_consumption_rainy,
                        "extreme": data.fuel_consumption_extreme
                    },
                    "tire_wear": {
                        "dry": data.tire_wear_dry,
                        "rainy": data.tire_wear_rainy,
                        "extreme": data.tire_wear_extreme,
                    }
                },
                "image": data.img,
            }
            this.actualizarData(carID, structuredData)
        })
    }

    async searchCar(userInput){
        const url = `http://localhost:3000/cars/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(car => car.model.toLowerCase().includes(userInput.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    editForm(car) {
        this.querySelector('input[name="id"]').value = car.id;
        this.querySelector('input[name="model"]').value= car.model;
        this.querySelector('input[name="motor"]').value= car.motor;
        this.querySelector('input[name="img"]').value= car.img;
        this.querySelector('input[name="acceleration_ZtoH"]').value= car.performance.acceleration_ZtoH;
        this.querySelector('input[name="max_speed_kmh"]').value= car.performance.max_speed_kmh;
        this.querySelector('input[name="average_Speed"]').value= car.performance.average_Speed;
        this.querySelector('input[name="fuel_consumption_dry"]').value= car.performance.fuel_consumption.dry;
        this.querySelector('input[name="fuel_consumption_rainy"]').value= car.performance.fuel_consumption.rainy;
        this.querySelector('input[name="fuel_consumption_extreme"]').value= car.performance.fuel_consumption.extreme;
        this.querySelector('input[name="tire_wear_dry"]').value= car.performance.tire_wear.dry;
        this.querySelector('input[name="tire_wear_rainy"]').value= car.performance.tire_wear.rainy;
        this.querySelector('input[name="tire_wear_extreme"]').value= car.performance.tire_wear.extreme;
    }

    clearForm(){
        this.querySelector('input[name="id"]').value = "";
        this.querySelector('input[name="model"]').value= "";
        this.querySelector('input[name="motor"]').value= "";
        this.querySelector('input[name="img"]').value= "";
        this.querySelector('input[name="acceleration_ZtoH"]').value= "";
        this.querySelector('input[name="max_speed_kmh"]').value= "";
        this.querySelector('input[name="average_Speed"]').value= "";
        this.querySelector('input[name="fuel_consumption_dry"]').value= "";
        this.querySelector('input[name="fuel_consumption_rainy"]').value= "";
        this.querySelector('input[name="fuel_consumption_extreme"]').value= "";
        this.querySelector('input[name="tire_wear_dry"]').value= "";
        this.querySelector('input[name="tire_wear_rainy"]').value= "";
        this.querySelector('input[name="tire_wear_extreme"]').value= "";    
    }

    async actualizarData(id,data){
        try {
            const respuesta = await fetch(`http://localhost:3000/cars/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
    
            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            } else {
                console.log("se envio la path info")
            }     
    
        } catch (error) {
            console.error('Error en la solicitud PATCH:', error.message);
        }
    };
}

customElements.define ('edit-car', EditarCarros)
