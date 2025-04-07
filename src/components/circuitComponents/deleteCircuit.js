class DeleteCircuit extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
        @import 'src/css/deleteStyle.css'
        </style>
        <div class="formDelete">
            <form id="myformDeleteCircuit">
                <h1>Delete Circuit</h1>

                <label for="circuitSearch">Search Circuit</label>
                <input type="text" id="circuitSearch" required>

                <label for="circuitName">ID</label>
                <input type="text" id="circuitId" name="id" disabled>
        
                <label for="circuitName">Name</label>
                <input type="text" id="circuitName" name="name" disabled>

                <label for="circuitCountry">Country</label>
                <input type="text" id="circuitCountry" name="country" disabled>

                <label for="circuitLength">Length (km)</label>
                <input type="number" id="circuitLength" name="length" disabled>

                <label for="circuitLaps">Laps</label>
                <input type="number" id="circuitLaps" name="laps" disabled>

                <label for="circuitDescription">Description</label>
                <textarea id="circuitDescription" name="description" rows="3" disabled></textarea>

                <label for="circuitImage">Image URL</label>
                <input type="url" id="circuitImage" name="image" disabled>

                <button type="submit">Delete</button>
            </form>
        </div>
        `;
    const appMain = document.querySelector('#main');

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "7";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 7) {
        btnBack.dataset.ed = "3";
        appMain.innerHTML = `<manage-circuit></manage-circuit>`;
      }
    });

    this.querySelector("#circuitSearch").addEventListener('input', async (e)=>{
      let textSearch = e.target.value;
      const result = await this.searchCircuit(textSearch);
      if(result){
          this.editForm(result);
      }else {
          this.clearForm();
      }
  })
  this.querySelector("#myformDeleteCircuit").addEventListener('submit', (e)=>{
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.target));
      const circuitID = this.querySelector('input[name="id"]').value;
      this.deleteCircuit(circuitID);
  })
  }

  editForm(product){
        this.querySelector('input[name="id"]').value = product.id;
        this.querySelector('input[name="name"]').value= product.name;
        this.querySelector('input[name="country"]').value= product.country;
        this.querySelector('input[name="length"]').value= product.length;
        this.querySelector('input[name="laps"]').value= product.laps;
    }
    clearForm(){
        this.querySelector('input[name="id"]').value = "";
        this.querySelector('input[name="name"]').value= "";
        this.querySelector('input[name="country"]').value= "";
        this.querySelector('input[name="length"]').value= "";
        this.querySelector('input[name="laps"]').value= "";
    }

    async searchCircuit(userInput){
        const url = `http://localhost:3000/circuits/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(circuit => circuit.name.toLowerCase().includes(userInput.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    async deleteCircuit(ID){
        try{
            const response = await fetch(`http://localhost:3000/circuits/${ID}`, {
                method: 'DELETE',
            })
            window.alert("The circuit has been deleted succesfully!")
        }catch(error){
            console.log(error)
        }
    }
}

customElements.define("delete-circuit", DeleteCircuit);
