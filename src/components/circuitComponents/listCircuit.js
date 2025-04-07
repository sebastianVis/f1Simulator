class ListCircuits extends HTMLElement{
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
        appMain.innerHTML = `<manage-circuit></manage-circuit>`;
      }
    });

    this.listCircuits();
  }

  async getCircuits() {
    try {
      const response = await fetch("http://localhost:3000/circuits");
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
    data.forEach((circuit) => {
      const circuitCard = document.createElement("article");
      circuitCard.className = "list-card";
      circuitCard.dataset.cid = `${circuit.id}`;
      const firstCard = document.createElement("div");
      firstCard.innerHTML = `
            <img src="${circuit.img}" alt="">
            <p>Name: ${circuit.name}</p>
            <p>Country: ${circuit.country}</p>
            <p>Length: ${circuit.length}</p>
            <p>Laps: ${circuit.laps}</p>
            `;

      const secondCard = document.createElement("div");
      secondCard.innerHTML = `
            <p>${circuit.description}</p>          
            `;
      circuitCard.appendChild(firstCard);
      circuitCard.appendChild(secondCard);
      cardContainer.appendChild(circuitCard);
      circuitCard.addEventListener("click", (e)=>{
      document.querySelector("#main").dataset.circuitInfo = [circuit.id, circuit.name, circuit.laps, circuit.length]
      })
    });
  }
}
customElements.define("list-circuits", ListCircuits);
