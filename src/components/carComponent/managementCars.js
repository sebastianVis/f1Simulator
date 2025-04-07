class ManagementCars extends HTMLElement{
    constructor(){
        super();
}
    connectedCallback(){
        this.innerHTML = `
        <div class= "card">
            <a id="createCar">
                <h1>Create a vehicle</h1>
                <p>Create a vehicle to drive around the Cars of the simulator</p>
            </a>
        </div>
        <div class= "card">
            <a id="editCar">
                <h1>Edit Car</h1>
                <p>Edit a Car that is already been racing in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="deleteCar">
                <h1>Delete Car</h1>
                <p>Delete a Car to stop racing in the simulator.</p>
            </a>
            </div>
        <div class= "card">
            <a id="listCars">
                <h1>List Cars</h1>
                <p>List Cars that are ready to be raced at the simulator.</p>
            </a>
        </div>
        `;
    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "5";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 5) {
        btnBack.dataset.ed = "1";
        document.body.innerHTML = `
                <management-component></management-component>`;
      }
    });

    document.querySelector("#createCar").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "5";
      appMain.innerHTML = `
            <create-car></create-car>
            `;
    });

    document.querySelector("#editCar").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "5";
      appMain.innerHTML = `
            <edit-car></edit-car>
        `;
    });

    document.querySelector("#deleteCar").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "5";
      appMain.innerHTML = `
            <delete-car></delete-car>
            `;
    });

    document.querySelector("#deleteCar").addEventListener("click", (e) => {
        e.preventDefault();
        btnBack.dataset.ed = "1";
        appMain.innerHTML = `
              <delete-car></delete-car>
              `;
      });

      document.querySelector("#listCars").addEventListener("click", (e) => {
        e.preventDefault();
        btnBack.dataset.ed = "1";
        appMain.innerHTML = `
              <list-cars></list-cars>
              `;
      });
}
}
customElements.define('manage-cars', ManagementCars)