class ListPilots extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML= /*html*/`
        <style>
        @import 'src/css/hoverCard.css'
        </style>
        <div id="cardListedContainer">
        </div>
        `;

        const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "9";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 9) {
        btnBack.dataset.ed = "2";
        appMain.innerHTML = `<manage-pilots></manage-pilots>`;
      }
    });

    this.listCircuits();
  }

  async getCircuits() {
    try {
      const response = await fetch("http://localhost:3000/teams");
      if (!response.ok) {
        throw new Error("We could not obtain the cars.");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async listCircuits() {
    const data = await this.getCircuits();
    const cardContainer = this.querySelector("#cardListedContainer");
    data.forEach((team) => {
      const teamCard = document.createElement("article");
      teamCard.className = "list-card";
      teamCard.dataset.tid = `${team.id}`;
      const firstCard = document.createElement("div");
      firstCard.innerHTML = `
            <img src="${team.image}" alt="">
            `;

      const secondCard = document.createElement("div");
      secondCard.innerHTML = `
            <p>Name: ${team.name}</p>
            <p>Country: ${team.country}</p>
            `;
      teamCard.appendChild(firstCard);
      teamCard.appendChild(secondCard);
      cardContainer.appendChild(teamCard);

      teamCard.addEventListener('click', async (e) => {
        cardContainer.innerHTML='';
        const teamChosen = teamCard.dataset.tid;
        const response = await fetch(`http://localhost:3000/teams/${teamChosen}`);
        try {
          const data = await response.json();
          let pilots = data.pilots;
          pilots.forEach(pilot => {
            const pilotCard = document.createElement("article");
            pilotCard.className = "list-card";
            pilotCard.dataset.tid = `${pilot.id}`;
            const firstCard = document.createElement("div");
            firstCard.innerHTML = `
                  <img src="${pilot.image}" alt="">
                  `;
      
            const secondCard = document.createElement("div");
            secondCard.innerHTML = `
                  <p>Name: ${pilot.name}</p>
                  <p>Role: ${pilot.role}</p>           
                  `;
            pilotCard.appendChild(firstCard);
            pilotCard.appendChild(secondCard);
            cardContainer.appendChild(pilotCard);
          })
        } catch (error) {
          console.error(error);
        }
        });

    });
    
  }
}

customElements.define('list-pilots',ListPilots)