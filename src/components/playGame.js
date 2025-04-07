class PlayGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    document.body.innerHTML = `
        <style>
        @import 'src/css/hoverCard.css'
        </style>
        <header class="header">
            <a id="btnBack"></a>
        </header>
        <main id="main">
                    <div id="cardListedContainer">
        </div>
        </main>
        `;
    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "30";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 30) {
        btnBack.dataset.ed = "1";
        appMain.innerHTML = `<main-component></main-component>`;
      }
    });

    this.listTeams();
  }

  async getTeams() {
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

  async getCars() {
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

  async listCars() {
    const data = await this.getCars();
    console.log(data)
    const cardContainer = document.querySelector("#cardListedContainer");
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
      carCard.addEventListener("click", (e) => {
        document.querySelector("#main").dataset.carInformation = [car.id, car.performance.acceleration_ZtoH, car.performance.max_speed_kmh, car.performance.average_Speed]
        cardContainer.innerHTML = ""
        this.listCircuits();
      })
    });

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
    const cardContainer = document.querySelector("#cardListedContainer");
    cardContainer.innerHTML = ''
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
      circuitCard.addEventListener("click", (e) => {
        const pilotInfo = document.querySelector("#main").dataset.pilotInfo;
        const pilotArray = pilotInfo.split(',');
        const pilotStructure = {
          'teamID': pilotArray[0],
          'pilotID': pilotArray[1],
          'pilotName': pilotArray[2],
          'pilotRole': pilotArray[3],
        }

        const circuitStructure = {
          'circuitID': circuit.id,
          'circuitName': circuit.name,
          'circuitLaps': circuit.laps,
          'circuitLength': circuit.length,
        }
        console.log(circuitStructure)

        let carInformation = document.querySelector('#main').dataset.carInformation
        let carArray = carInformation.split(',');
        const carStructure = {
          'carID': carArray[0],
          'carAcceleration': carArray[1],
          'carMaxSpeed': carArray[2],
          'carAverageSpeed': carArray[3]

        }
        const main = document.querySelector("#main")
        main.innerHTML = ""
        const simulacion = document.createElement('simulate-card');
        simulacion.setAttribute('circuit-name', circuitStructure.circuitName);
        simulacion.setAttribute('laps', circuitStructure.circuitLaps );
        simulacion.setAttribute('length', circuitStructure.circuitLength);
        simulacion.setAttribute('acceleration', carStructure.carAcceleration );
        simulacion.setAttribute('max-speed', carStructure.carMaxSpeed);
        simulacion.setAttribute('normal-speed', carStructure.carAverageSpeed);
        simulacion.setAttribute('pilot-name', pilotStructure.pilotName);
        simulacion.setAttribute('pilot-number', pilotStructure.pilotID);
        main.appendChild(simulacion);
      })
    });
  }
  async listTeams() {
    const data = await this.getTeams();
    const cardContainer = document.querySelector("#cardListedContainer");
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
        cardContainer.innerHTML = '';
        const teamChosen = teamCard.dataset.tid;
        const response = await fetch(`http://localhost:3000/teams/${teamChosen}`);
        try {
          const data = await response.json();
          let pilots = data.pilots;
          pilots.forEach(pilot => {
            const pilotCard = document.createElement("article");
            pilotCard.className = "list-card pilot-card";
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
            pilotCard.addEventListener('click', async (e) => {
              const chosenPilot = pilot;
              document.querySelector("#main").dataset.pilotInfo = [team.id, pilot.id, pilot.name, pilot.role]
              cardContainer.innerHTML = "";
              this.listCars()

            })
          })
        } catch (error) {
          console.error(error);

        }
      });
    });


  }

}


customElements.define('play-game', PlayGame);