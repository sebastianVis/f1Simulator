class ManagePilots extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style> @import 'src/css/cardStyle.css'</style>
        <div class= "card">
            <a id="createPilot">
                <h1>Create Pilot</h1>
                <p>Create a pilote to race and participate in competitions.</p>
            </a>
        </div>
        <div class= "card">
            <a id="editPilot">
                <h1>Edit Pilot</h1>
                <p>Edit a pilot that is already part of the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="deletePilot">
                <h1>Delete Pilot</h1>
                <p>Delete a pilot to stop participating in the team and simulator.</p>
            </a>
            </div>
        <div class= "card">
            <a id="listPilots">
                <h1>List Pilots</h1>
                <p>List pilots that are ready to be part of the simulator.</p>
            </a>
        </div>
        `;

    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "4";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 4) {
        btnBack.dataset.ed = "1";
        document.body.innerHTML = `
                <management-component></management-component>`;
      }
    });

    document.querySelector("#createPilot").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <create-pilot></create-pilot>
            `;
    });

    document.querySelector("#editPilot").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
        <edit-pilot></edit-pilot>
        `;
    });

    document.querySelector("#deletePilot").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <delete-pilot></delete-pilot>
            `;
    });

    document.querySelector("#listPilots").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <list-pilots></list-pilots>
            `;
    });
  }
}

customElements.define("manage-pilots", ManagePilots);
