class ManageCircuit extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class= "card">
            <a id="createCircuit">
                <h1>Create Circuit</h1>
                <p>Create a circuit to race and make competitions.</p>
            </a>
        </div>
        <div class= "card">
            <a id="editCircuit">
                <h1>Edit Circuit</h1>
                <p>Edit a circuit that is already been racing in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="deleteCircuit">
                <h1>Delete Circuit</h1>
                <p>Delete a circuit to stop racing in the simulator.</p>
            </a>
            </div>
        <div class= "card">
            <a id="listCircuit">
                <h1>List Circuits</h1>
                <p>List circuits that are ready to be raced at the simulator.</p>
            </a>
        </div>
        `;
    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "2";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 2) {
        btnBack.dataset.ed = "1";
        document.body.innerHTML = `
                <management-component></management-component>`;
      }
    });

    document.querySelector("#createCircuit").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <create-circuit></create-circuit>
            `;
    });

    document.querySelector("#editCircuit").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <edit-circuit></edit-circuit>
        `;
    });

    document.querySelector("#deleteCircuit").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <delete-circuit></delete-circuit>
            `;
    });

    document.querySelector('#listCircuit').addEventListener('click' , (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <list-circuits></list-circuits>
      `
    })
  }
}

customElements.define("manage-circuit", ManageCircuit);
