class ManagementComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    document.body.innerHTML = `  
        <style> @import 'src/css/cardStyle.css'</style>
        <video src="src/services/0203(1).mp4" autoplay muted loop id="background-video"></video>

        <header class="header">
            <a id="btnBack"></a>
        </header>
        <main id="main">
        <div class= "card">
            <a id="manageCircuit">
                <h1>Manage Circuits</h1>
                <p>Manage circuits to race and make competitions.</p>
            </a>
        </div>
        <div class= "card">
            <a id="manageTeam">
                <h1>Manage Teams</h1>
                <p>Manage teams to participate in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="managePilots">
                <h1>Manage Pilots</h1>
                <p>Manage a pilots to participate in the simulator.</p>
            </a>
        </div>
        <div class= "card">
            <a id="manageCars">
                <h1>Manage Cars</h1>
                <p>Manage a car to pilots to race.</p>
            </a>
        </div>
        </main>
        
        `;

    const appMain = document.querySelector("#main");

    const btnBack = document.querySelector("#btnBack");
    btnBack.dataset.ed = "1";
    btnBack.addEventListener("click", () => {
      if (btnBack.dataset.ed == 1) {
        btnBack.dataset.ed = "0";
        document.body.innerHTML = `
                <main-component></main-component>`;
      }
    });

    document.querySelector("#manageCircuit").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "0";
      appMain.innerHTML = `
            <manage-circuit></manage-circuit>
            `;
    });
    document.querySelector("#manageTeam").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "0";
      appMain.innerHTML = `
            <manage-team></manage-team>
            `;
    });
    document.querySelector("#managePilots").addEventListener("click", (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "0";
      appMain.innerHTML = `
            <manage-pilots></manage-pilots>
            `;
    });

    document.querySelector("#manageCars").addEventListener("click" , (e) => {
      e.preventDefault();
      btnBack.dataset.ed = "0";
      appMain.innerHTML = `
        <manage-cars></manage-cars>
      `
    })
  }
}

customElements.define("management-component", ManagementComponent);
