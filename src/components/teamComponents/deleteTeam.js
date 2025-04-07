class DeleteTeam extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <style>
        @import 'src/css/deleteStyle.css'
        </style>
        <div class="formDelete">
            <form id="myformDeleteTeam">
                <h1>Delete Team</h1>

                <label for="teamSearch">Search</label>
                <input type="text" id="searchDelete" required>

                <label for="teamName">ID</label>
                <input type="text" id="teamName" name="id" disabled>
        
                <label for="teamName">Name</label>
                <input type="text" id="teamName" name="name" required>

                <label for="teamCountry">Country</label>
                <input type="text" id="teamCountry" name="country" disabled>

                <label for="teamImage">Image URL</label>
                <input type="url" id="teamImage" name="image" disabled>

                <button type="submit">Delete</button>
            </form>
        </div>
        `;

        const appMain = document.querySelector('#main');
        
        const btnBack = document.querySelector("#btnBack");
        btnBack.dataset.ed = "10";
        btnBack.addEventListener("click", () => {
          if (btnBack.dataset.ed == 10) {
            btnBack.dataset.ed = "3";
            appMain.innerHTML = `<manage-team></manage-team>`;
          }

        });

        this.querySelector("#searchDelete").addEventListener('input', async (e) => {
            let textSearch = e.target.value;
            const result = await this.searchTeam(textSearch);
            if(result){
                this.deleteForm(result);
            }else {
                this.clearForm();
            }
        });
  
        this.querySelector("#myformDeleteTeam").addEventListener('submit', (e)=>{
            e.preventDefault()
            const formData = Object.fromEntries(new FormData(e.target)); 
            var teamID = this.querySelector('input[name="id"]').value;
            this.updateData(teamID, formData)
        });

        
    }

    deleteForm(data){
        this.querySelector('input[name="id"]').value = data.id;
        this.querySelector('input[name="name"]').value = data.name;
        this.querySelector('input[name="country"]').value = data.country;
        this.querySelector('input[name="image"]').value = data.image;
    }

    clearForm() {
      this.querySelector('input[name="id"]').value = "";
        this.querySelector('input[name="name"]').value = "";
        this.querySelector('input[name="country"]').value = "";
        this.querySelector('input[name="image"]').value = "";
    }

    async searchTeam(inputUsuario){
        const url = `http://localhost:3000/teams/`;
        const response = await fetch(url);
        const data = await response.json();
        const result = data.filter(team => team.name.toLowerCase().includes(inputUsuario.toLowerCase()));
        return result.length > 0 ? result[0] : null;
    }

    async updateData(id,data){
        try {
            const result = await fetch(`http://localhost:3000/teams/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });
    
            if (!result.ok) {
                throw new Error(`Error ${result.status}: ${result.statusText}`);
            } else {
                console.log("se envio la path info")
            }     
    
        } catch (error) {
            console.error('Error en la solicitud PATCH:', error.message);
        }
    };
}

customElements.define('delete-team', DeleteTeam)