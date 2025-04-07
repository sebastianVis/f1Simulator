class CreateTeam extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
        @import 'src/css/createStyle.css'
        </style>
        <div class="formCreate">
            <form id="myformCrearTeam">
                <h1>Create Team</h1>
        
                <label for="teamName">Name</label>
                <input type="text" id="teamName" name="name" required>

                <label for="teamCountry">Country</label>
                <input type="text" id="teamCountry" name="country" required>

                <label for="teamImage">Image URL</label>
                <input type="url" id="teamImage" name="image" required>

                <button type="submit">Submit</button>
            </form>
        </div>
        `;

        const appMain = document.querySelector('#main');
        
        const btnBack = document.querySelector("#btnBack");
        btnBack.dataset.ed = "9";
        btnBack.addEventListener("click", () => {
          if (btnBack.dataset.ed == 9) {
            btnBack.dataset.ed = "3";
            appMain.innerHTML = `<manage-team></manage-team>`;
          }
        });

        this.querySelector("#myformCrearTeam").addEventListener("submit", async(e)=>{
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.target));
          let idGenerated = Date.now().toString(16);
          data.pilots = []
          const formattedData = {
            "id" : idGenerated,
            "name" : data.name,
            "country" : data.country,
            "image" : data.image
          } 
          formattedData.pilots = []


          const finalData = JSON.stringify(formattedData)
          try {
              const response = await fetch("http://localhost:3000/teams", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: finalData
              });
              console.log("Team created:", formattedData);
              alert("Team created successfully!");
          } catch (error) {
              console.error("Error al enviar datos:", error);
              alert("pipipi")
          }
      })
  }
}

customElements.define("create-team", CreateTeam);
