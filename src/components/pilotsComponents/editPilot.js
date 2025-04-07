class EditPilotComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>@import 'src/css/editStyle.css'</style>
        <div class="formEdit">
            <form id="myformEditPilot">
                <h1>Write team to edit a pilot</h1>

                <label for="teamSearch">Search</label>
                <input type="text" id="teamSearch" required>
                
                <label for="teamName">Name</label>
                <input type="text" id="teamName" name="name" disabled>

                <label for="teamId">ID</label>
                <input type="text" id="teamId" disabled>

                <label for="pilotSearch">Search</label>
                <input type="text" id="pilotSearch" required>

                <label for="pilotId">Pilot ID</label>
                <input type="text" id="pilotId" name="id" disabled>

                <label for="pilotName">Name</label>
                <input type="text" id="pilotName" name="name">

                <label for="pilotRole">Role</label>
                <input type="text" id="pilotRole" name="role">

                <label for="pilotImage">Image URL</label>
                <input type="url" id="pilotImage" name="image">

                <button type="submit">Edit</button>
            </form>
        </div>
        `;
    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "14";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 14) {
        btnBack.dataset.ed = "4";
        appMain.innerHTML = `<manage-pilots></manage-pilots>`;
      }
    });
    this.querySelector("#teamSearch").addEventListener("input", async (e) => {
      let textSearch = e.target.value;
      const result = await this.searchTeam(textSearch);
      if (result) {
        this.editForm(result);
      } else {
        this.clearForm();
      }
    });
    this.querySelector("#myformEditPilot").addEventListener(
      "submit",
      async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        const teamID = this.querySelector("#teamId").value;
        const formattedData = JSON.stringify(data);
        try {
          const pilotId = this.querySelector("#pilotId").value;
          const response = await fetch(
            `http://localhost:3000/teams/${teamID}/`
          );
          const responseFormatted = await response.json();
          let pilots = responseFormatted.pilots;
          pilots.forEach((piloto) => {
            if (piloto.id == pilotId) {
              piloto.name = data.name;
              piloto.image = data.image;
              piloto.role = data.role;
            }
          });
          let finalData = { pilots: pilots };
          fetch(`http://localhost:3000/teams/${teamID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalData),
          });
          console.log("Pilot created:", formattedData);
          alert("Pilot edited successfully!");
        } catch (error) {
          console.error(error);
          console.error("Error al enviar datos:", error);
          alert("pipipi");
        }
      }
    );

    this.querySelector("#pilotSearch").addEventListener("input", async (e) => {
      let textSearch = e.target.value;
      const ID = this.querySelector("#teamId").value;
      const result = await this.buscarPilotos(textSearch, ID);
      if (result) {
        this.editPilots(result);
      } else {
        this.clearPilots();
      }
    });
  }
  async searchTeam(inputUser) {
    const url = `http://localhost:3000/teams/`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.filter((dataSearch) =>
      dataSearch.name.toLowerCase().includes(inputUser.toLowerCase())
    );
    return result.length > 0 ? result[0] : null;
  }

  async buscarPilotos(inputUser, id) {
    const url = `http://localhost:3000/teams/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const pilotos = data.pilots;
    const result = pilotos.filter((piloto) =>
      piloto.name.toLowerCase().includes(inputUser.toLowerCase())
    );
    return result.length > 0 ? result[0] : null;
  }

  editForm(product) {
    this.querySelector("#teamId").value = product.id;
    this.querySelector("#teamName").value = product.name;
  }
  clearForm() {
    this.querySelector("#teamId").value = "";
    this.querySelector("#teamName").value = "";
  }

  editPilots(pilot) {
    this.querySelector("#pilotId").value = pilot.id;
    this.querySelector("#pilotName").value = pilot.name;
    this.querySelector("#pilotImage").value = pilot.image;
    this.querySelector("#pilotRole").value = pilot.role;
  }
  clearPilots() {
    this.querySelector("#pilotId").value = "";
    this.querySelector("#pilotName").value = "";
    this.querySelector("#pilotImage").value = "";
    this.querySelector("#pilotRole").value = "";
  }
}

customElements.define("edit-pilot", EditPilotComponent);
