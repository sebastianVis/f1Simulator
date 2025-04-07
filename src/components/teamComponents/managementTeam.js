class ManagePilots extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style> @import 'src/css/cardStyle.css'</style>
        <div class= "card">
            <a id="createTeam">
                <h1>Create Team</h1>
                <p>Create a team to race and make competitions.</p>
            </a>
        </div>
        <div class= "card">
            <a id="editTeam">
                <h1>Edit Team</h1>
                <p>Edit a team that is already been part of the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="deleteTeam">
                <h1>Delete Team</h1>
                <p>Delete a team to stop participating in the simulator.</p>
            </a>
            </div>
        <div class= "card">
            <a id="listTeam">
                <h1>List Teams</h1>
                <p>List teams that are ready to be participate at the simulator.</p>
            </a>
        </div>
        `;
    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "3";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 3) {
        btnBack.dataset.ed = "1";
        document.body.innerHTML = `
                <management-component></management-component>`;
      }
    });

    document.querySelector("#createTeam").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";

      appMain.innerHTML = `
            <create-team></create-team>
            `;
    });

    document.querySelector("#editTeam").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";

      appMain.innerHTML = `
        <edit-team></edit-team>
        `;
    });

    document.querySelector("#deleteTeam").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";

      appMain.innerHTML = `
            <delete-team></delete-team>
            `;
    });

    document.querySelector("#listTeam").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "1";
      appMain.innerHTML = `
            <list-team></list-team>
            `;
    });
  }
}

customElements.define("manage-team", ManagePilots);
