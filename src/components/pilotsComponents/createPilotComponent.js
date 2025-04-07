class CreatePilot extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <style>
        @import 'src/css/createStyle.css'
        </style>
        <div class="formCreate">
            <form id="myformCreatePilot">
                <h1>Write a Team to Add a Pilot</h1>
                
                <label for="teamSearch">Search</label>
                <input type="text" id="teamSearch" required>

                <label for="teamName">Name</label>
                <input type="text" id="teamName" disabled>

                <label for="teamId">ID</label>
                <input type="text" id="teamId" disabled>

                <label for="pilotName">Name</label>
                <input type="text" id="pilotName" name="name" required>

                <label for="pilotRole">Role</label>
                <input type="text" id="pilotRole" name="role" required>

                <label for="pilotImage">Image URL</label>
                <input type="url" id="pilotImage" name="image" required>

                <button type="submit">Submit</button>
            </form>
        </div>
        `;
    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "12";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 12) {
        btnBack.dataset.ed = "4";
        appMain.innerHTML = `<manage-pilots></manage-pilots>`;
      }
    });

    this.querySelector("#teamSearch").addEventListener('input', async (e)=>{
      let textSearch = e.target.value;
      const result = await this.searchTeam(textSearch);
      if(result){
          this.editForm(result);
      }else {
          this.clearForm();
      }
  })

  this.querySelector("#myformCreatePilot").addEventListener('submit', async (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));
    const teamID = this.querySelector("#teamId").value;
    let idGenerated = Date.now().toString(16);
    const formattedData = {
      "id" : idGenerated,
      "name" : data.name,
      "role" : data.role,
      "image" : data.image
    }
    
    try{
        const response = await fetch(`http://localhost:3000/teams/${teamID}/`);
        const responseFormatted = await response.json();
        let pilots = responseFormatted.pilots;
        pilots.push(formattedData)
        let finalData = {"pilots": pilots};
        fetch(`http://localhost:3000/teams/${teamID}`,{ 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalData),})
            console.log("Pilot created:", formattedData);
            alert("Pilot created successfully!");
          }catch(error){
        console.error(error)
        console.error("Error al enviar datos:", error);
        alert("pipipi")
    }
})

  }
  async searchTeam(inputUsuario){
    const url = `http://localhost:3000/teams/`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.filter(dataSearch => dataSearch.name.toLowerCase().includes(inputUsuario.toLowerCase()));
    return result.length > 0 ? result[0] : null;
}

editForm(product){
    this.querySelector("#teamId").value = product.id;
    this.querySelector("#teamName").value= product.name;
}
clearForm(){
    this.querySelector("#teamId").value = "";
    this.querySelector("#teamName").value= "";
}
}

customElements.define("create-pilot", CreatePilot);
