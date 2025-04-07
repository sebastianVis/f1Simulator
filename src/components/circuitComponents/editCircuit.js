class EditCircuitComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>@import 'src/css/editStyle.css'</style>
        <div class="formEdit">
            <form id="myformEditCircuit">
                <h1>Edit Circuit</h1>
        
                <label for="search">Search circuit by name</label>
                <input type="text" id="buscarEditar" required>

                <label for="circuitId">id</label>
                <input type="text" id="circuitId" name="id" disabled>

                <label for="circuitName">Name</label>
                <input type="text" id="circuitName" name="name">

                <label for="circuitCountry">Country</label>
                <input type="text" id="circuitCountry" name="country">

                <label for="circuitLength">Length (km)</label>
                <input type="number" id="circuitLength" name="length">

                <label for="circuitLaps">Laps</label>
                <input type="number" id="circuitLaps" name="laps">

                <label for="circuitDescription">Description</label>
                <textarea id="circuitDescription" name="description" rows="3"></textarea>

                <label for="circuitImage">Image URL</label>
                <input type="url" id="circuitImage" name="image">

                <button type="submit">Update</button>
            </form>
        </div>
        `;

    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "8";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 8) {
        btnBack.dataset.ed = "2";
        appMain.innerHTML = `<manage-circuit></manage-circuit>`;
      }
    });

    this.querySelector("#buscarEditar").addEventListener("input", async (e) => {
      let textSearch = e.target.value;
      const result = await this.searchCircuit(textSearch);
      if (result) {
        this.editForm(result);
      }
    });

    this.querySelector("#myformEditCircuit").addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      const circuitID = this.querySelector('input[name="id"]').value;
      console.log(circuitID);
      const structuredData = {
        id: circuitID,
        name: data.name,
        country: data.country,
        length: data.length,
        laps: data.laps,
        description: data.description,
        img: data.image,
      };
      this.actualizarData(circuitID, structuredData);
    });
  }

  async searchCircuit(userInput){
    const url = `http://localhost:3000/circuits/`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.filter(circuit => circuit.name.toLowerCase().includes(userInput.toLowerCase()))
    return result.length > 0 ? result[0] : null;
}

editForm(circuit){
    this.querySelector('input[name="id"]').value = circuit.id;
    this.querySelector('input[name="name"]').value= circuit.name;
    this.querySelector('input[name="country"]').value= circuit.country;
    this.querySelector('input[name="length"]').value= circuit.length;
    this.querySelector('input[name="laps"]').value= circuit.laps;
    this.querySelector('input[name="description"]').value= circuit.description;
    this.querySelector('input[name="image"]').value= circuit.img;
}

clearForm(){
    this.querySelector('input[name="id"]').value = "";
    this.querySelector('input[name="name"]').value= "";
    this.querySelector('input[name="country"]').value= "";
    this.querySelector('input[name="length"]').value= "";
    this.querySelector('input[name="laps"]').value= "";
    this.querySelector('input[name="description"]').value= "";
    this.querySelector('input[name="image"]').value= "";
}
async actualizarData(id,data){
    try {
        const respuesta = await fetch(`http://localhost:3000/circuits/${id}`, {
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
            alert("fino creado")

        }     

    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
        alert("pipipi")

    }
};


}

customElements.define("edit-circuit", EditCircuitComponent);
