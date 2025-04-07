class ListCars extends HTMLElement{
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
        btnBack.dataset.ed = "5";
        appMain.innerHTML = `<manage-cars></manage-cars>`;
      }

    });

    this.listCircuits();
  }

  async getCircuits() {
    try {
      const response = await fetch("http://localhost:3000/cars");
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
    data.forEach((car) => {
      const carCard = document.createElement("article");
      carCard.className = "list-card";
      carCard.dataset.carid = `${car.id}`;
      const firstCard = document.createElement("div");
      firstCard.innerHTML = `
            <img src="${car.image}" alt="">
            `;

      const secondCard = document.createElement("div");
      secondCard.innerHTML = `
            <p>Model: ${car.model}</p>
            <p>Motor: ${car.motor}</p>
            `;
      carCard.appendChild(firstCard);
      carCard.appendChild(secondCard);
      cardContainer.appendChild(carCard);
    });

  }
}
customElements.define('list-cars', ListCars)
