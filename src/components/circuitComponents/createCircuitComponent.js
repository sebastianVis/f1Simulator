class CreateCircuit extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
        @import 'src/css/createStyle.css'
        </style>
        <div class="formCreate">
            <form id="myformCrearCircuito">
                <h1>Create Circuit</h1>

        
                <label for="circuitName">Name</label>
                <input type="text" id="circuitName" name="name" required>

                <label for="circuitCountry">Country</label>
                <input type="text" id="circuitCountry" name="country" required>

                <label for="circuitLength">Length (km)</label>
                <input type="number" id="circuitLength" name="length" required>

                <label for="circuitLaps">Laps</label>
                <input type="number" id="circuitLaps" name="laps" required>

                <label for="circuitDescription">Description</label>
                <textarea id="circuitDescription" name="description" rows="3" required></textarea>

                <label for="circuitImage">Image URL</label>
                <input type="url" id="circuitImage" name="img" required>

                <button type="submit">Submit</button>
            </form>
        </div>
        `;

    const appMain = document.querySelector('#main');

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "6";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 6) {
        btnBack.dataset.ed = "2";
        appMain.innerHTML = `<manage-circuit></manage-circuit>`;
      }
    });

    this.querySelector("#myformCrearCircuito").addEventListener('submit', async (e)=>{
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.target));
      let idGenerated = Date.now().toString(16);
      data.lap_record= {};
      data.winners = [];
      const formattedData = {
          "id" : idGenerated,
          "name": data.name,
          "country": data.country,
          "length": data.length, 
          "laps": data.laps,
          "description": data.description,
          "img": data.img,
          "lap_record": data.lap_record,
          "winners": data.winners
      }
      const finalData = JSON.stringify(formattedData);
      try{
          const response =  await fetch("http://localhost:3000/circuits", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: finalData
          });
          window.alert("The circuit has been added succesfully!")
      }catch(error){
          console.error(error)
      }

  })
  }
}

customElements.define("create-circuit", CreateCircuit);
