class EliminarCarros extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
        <style>
        @import 'src/css/deleteStyle.css'
        </style>
    <div class="formDelete">
            <form id="myformDeleteCar">
                    <h1 style="text-align: center;">Delete Car</h1>

                    <label for="model">Search vehicle:</label>
                    <input type="text" id="searchCar" required>

                    <label for="id">Car ID:</label>
                    <input type="text" name="id" disabled>

                    <label for="model">Car model:</label>
                    <input type="text" name="model" disabled>

                    <label for="motor">Car Motor:</label>
                    <input type="text" name="motor" disabled>

                    <button type="submit">Submit</button>      
            </form>
          </div>
        `;

    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "15";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 15) {
        btnBack.dataset.ed = "5";
        appMain.innerHTML = `<manage-cars></manage-cars>`;
      }
    });

    this.querySelector("#searchCar").addEventListener("input", async (e) => {
      let textSearch = e.target.value;
      const result = await this.searchCar(textSearch);
      if (result) {
        this.editForm(result);
      } else {
        this.clearForm();
      }
    });
    this.querySelector("#myformDeleteCar").addEventListener("submit", (e) => {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(e.target));
      const carID = this.querySelector('input[name="id"]').value;
      this.deleteCar(carID);
    });
  }

  async searchCar(userInput) {
    const url = `http://localhost:3000/cars/`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.filter((producto) =>
      producto.model.toLowerCase().includes(userInput.toLowerCase())
    );
    return result.length > 0 ? result[0] : null;
  }

  editForm(product) {
    this.querySelector('input[name="id"]').value = product.id;
    this.querySelector('input[name="model"]').value = product.model;
    this.querySelector('input[name="motor"]').value = product.motor;
  }
  clearForm() {
    this.querySelector('input[name="id"]').value = "";
    this.querySelector('input[name="model"]').value = "";
    this.querySelector('input[name="motor"]').value = "";
  }

  async deleteCar(id) {
    try {
      const response = await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DElETE",
      });
      if (response.ok) {
        window.alert(
          `The car identified with id ${id} has been deleted succesfully! `
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
}

customElements.define("delete-car", EliminarCarros);
