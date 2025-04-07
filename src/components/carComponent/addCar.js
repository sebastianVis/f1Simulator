class AgregarCarros extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
        <style>
        @import '/src/css/formCreateCard.css'
        </style>

        <div class="formCreate">
            <form id="myformAddCar">
          <div class="containerTitle">
            <h1 style="text-align: center;">Add Car</h1>
          </div>
    
      <div class="containerInfo">
      <div class="container">
          <label for="model">Car model:</label>
          <input type="text" name="model" required>
      </div>

      <div class="container">
          <label for="motor">Car Motor:</label>
          <input type="text" name="motor" required>
      </div>

      <div class="container">
          <label for="acceleration_ZtoH">Acceleration Zero to Hundred:</label>
          <input type="text" name="acceleration_ZtoH" required>
      </div>

      <div class="container">
          <label for="max_speed_kmh">Max. Speed (Km/h):</label>
          <input type="text" name="max_speed_kmh" required>
      </div>
      
      <div class="container">
          <label for="average_Speed">Average Speed (Km/h):</label>
          <input type="text" name="average_Speed" required>
      </div>
      
      <div class="container">
          <label for="fuel_consumption_dry">Fuel consumption (dry):</label>
          <input type="text" name="fuel_consumption_dry" required>
      </div>

      <div class="container">
          <label for="fuel_consumption_rainy">Fuel consumption (rainy):</label>
          <input type="text" name="fuel_consumption_rainy" required>
      </div>
      
      <div class="container">
          <label for="fuel_consumption_extreme">Fuel consumption (extreme):</label>
          <input type="text" name="fuel_consumption_extreme" required>
      </div>
      
      <div class="container">
          <label for="tire_wear_dry">Tire Wear (dry):</label>
          <input type="text" name="tire_wear_dry" required>
      </div>

      <div class="container">
          <label for="tire_wear_rainy">Tire Wear (rainy):</label>
          <input type="text" name="tire_wear_rainy" required>
      </div>
      
      <div class="container">
          <label for="tire_wear_extreme">Tire Wear (extreme):</label>
          <input type="text" name="tire_wear_extreme" required>
      </div>
      
      <div class="container">
          <label for="img">Car image:</label>
          <input type="text" name="img" required>
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

    this.querySelector("#myformAddCar").addEventListener("submit", async (e) => {
      e.preventDefault();
      let idGenerated = Date.now().toString(16);
      let data = Object.fromEntries(new FormData(e.target));
      const formattedData = {
        id: idGenerated,
        model: data.model,
        motor: data.motor,
        performance: {
          acceleration_ZtoH: data.acceleration_ZtoH,
          max_speed_kmh: data.max_speed_kmh,
          average_Speed: data.average_Speed,
          fuel_consumption: {
            dry: data.fuel_consumption_dry,
            rainy: data.fuel_consumption_rainy,
            extreme: data.fuel_consumption_extreme,
          },
          tire_wear: {
            dry: data.tire_wear_dry,
            rainy: data.tire_wear_rainy,
            extreme: data.tire_wear_extreme,
          },
        },
        image: data.img,
      };
      const finalData = JSON.stringify(formattedData);
      try {
        const response = await fetch("http://localhost:3000/cars", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: finalData,
        });
        window.alert("Car was added succesfully!");
      } catch (error) {
        console.error(error);
      }
    });
  }
}
customElements.define("create-car", AgregarCarros);
