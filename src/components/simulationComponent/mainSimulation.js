import { Application } from '@splinetool/runtime';

class Circuit {
    constructor(name, laps, length, weather) {
        this.name = name;
        this.laps = laps;
        this.length = length;
        this.weather = weather;
    }
}

class Car {
    constructor(acceleration, maxSpeed, normalSpeed, fuel) {
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.normalSpeed = normalSpeed;
        this.fuel = fuel;
        this.currentTireWear = 0;
        this.fuelConsumption = {
            dry: 1.9,
            rainy: 2.1,
            extreme: 2.4
        };
        this.tireWear = {
            dry: 1.5,
            rainy: 0.8,
            extreme: 2.5
        };
    }

    reset() {
        this.currentTireWear = 0;
        this.fuel = 100;
    }
}

class Driver {
    constructor(name, number, car) {
        this.name = name;
        this.number = number;
        this.car = car;
        this.lapTimes = [];
        this.totalTime = 0;
    }

    reset() {
        this.lapTimes = [];
        this.totalTime = 0;
        this.car.reset();
    }
}

class SingleDriverRace {
    constructor(circuit, driver) {
        this.circuit = circuit;
        this.driver = driver;
    }

    reset() {
        this.driver.reset();
    }

    calculateLapTime() {
        const baseTime = (this.circuit.length / this.driver.car.normalSpeed) * 3600;

        const weatherEffect = {
            dry: 1,
            rainy: 1.2,
            extreme: 1.4
        }[this.circuit.weather];

        this.driver.car.currentTireWear += this.driver.car.tireWear[this.circuit.weather] * 0.25;
        const fuelEffect = this.driver.car.fuelConsumption[this.circuit.weather];

        this.driver.car.fuel -= fuelEffect;
        if (this.driver.car.fuel < 0) {
            this.driver.car.fuel = 0;
            return false;
        }

        const randomFactor = 0.95 + Math.random() * 0.1;

        return baseTime * weatherEffect * this.driver.car.currentTireWear * (this.driver.car.fuel * 0.1) * randomFactor;
    }

    simulate() {
        this.driver.lapTimes = [];
        this.driver.totalTime = 0;

        for (let lap = 1; lap <= this.circuit.laps; lap++) {
            const lapTime = this.calculateLapTime();
            this.driver.lapTimes.push(lapTime);
            this.driver.totalTime += lapTime;
        }
    }

    getResults() {
        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = (seconds % 60).toFixed(3);
            return `${mins}:${secs.padStart(6, '0')}`;
        };

        return {
            driverName: this.driver.name,
            number: this.driver.number,
            totalTime: formatTime(this.driver.totalTime),
            lapTimes: this.driver.lapTimes.map((time, index) => ({
                lap: index + 1,
                time: formatTime(time)
            }))
        };
    }
}

//const inicio = new SimulateCard("raul" ,4 ,3.000 ,"Extreme" , 2.3, 340, 320, "juanito", 2 )
//inicio.updateResults()
class SimulateCard extends HTMLElement {
    static get observedAttributes() {
        return [
            'circuit-name', 
            'laps', 
            'length', 
            'weather',
            'acceleration',
            'max-speed',
            'normal-speed',
            'pilot-name',
            'pilot-number'
        ];
    }

    constructor() {
        super();
        this.isSimulating = false;
        this.currentLap = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.results = [];
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'circuit-name':
                this.circuitName = newValue;
                console.log(this.circuitName);
                break;
            case 'laps':
                this.laps = parseInt(newValue);
                console.log(this.laps);
                break;
            case 'length':
                this.length = parseFloat(newValue);
                console.log(this.length);
                break;
            case 'acceleration':
                this.acceleration = parseFloat(newValue);
                break;
            case 'max-speed':
                this.maxSpeed = parseInt(newValue);
                break;
            case 'normal-speed':
                this.normalSpeed = parseInt(newValue);
                break;
            case 'pilot-name':
                this.pilotName = newValue;
                break;
            case 'pilot-number':
                this.pilotNumber = parseInt(newValue);
                break;
        }
        
        this.circuit = new Circuit(this.circuitName, this.laps, this.length, "dry");
        this.car = new Car(this.acceleration, this.maxSpeed, this.normalSpeed, 100);
        this.driver = new Driver(this.pilotName, this.pilotNumber, this.car);
        this.race = new SingleDriverRace(this.circuit, this.driver);
    }

    async connectedCallback() {
        await this.render();
        this.addStyles();
        await this.initializeSplineScenes();
    }

    async initializeSplineScenes() {
        try {
            const carCanvas = this.querySelector('#carCanvas');
            const circuitCanvas = this.querySelector('#circuitCanvas');

            if (!carCanvas || !circuitCanvas) {
                console.error('Canvas elements not found');
                return;
            }

            carCanvas.width = carCanvas.offsetWidth;
            carCanvas.height = carCanvas.offsetHeight;
            circuitCanvas.width = circuitCanvas.offsetWidth;
            circuitCanvas.height = circuitCanvas.offsetHeight;

            const carApp = new Application(carCanvas);
            const circuitApp = new Application(circuitCanvas);

            await Promise.all([
                carApp.load('https://prod.spline.design/Dp7C-Wkt66wsbWGb/scene.splinecode'),
                circuitApp.load('https://prod.spline.design/yPpBOo5turGeSN1X/scene.splinecode')
            ]);
        } catch (error) {
            console.error('Error initializing Spline scenes:', error);
        }
    }

    addStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .simulation-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                padding: 20px;
                max-width: 1400px;
                margin: 0 auto;
                height: 100vh;
                background-color: #121212;
            }

            .left-cards {
                display: flex;
                flex-direction: column;
                gap: 20px;
                height: 100%;
            }

            .canvas-container {
                background: #1E1E1E;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                height: calc(50% - 10px);
                min-height: 300px;
                position: relative;
                overflow: hidden;
                border: 1px solid #333;
            }

            #carCanvas, #circuitCanvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100% !important;
                height: 100% !important;
            }

            .results-card {
                background: #1E1E1E;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                gap: 20px;
                height: 95.1vh;
                color: #FFFFFF;
                border: 1px solid #333;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color:rgba(129, 9, 9, 0.86) #1E1E1E;
            }

            /* Estilos para la scrollbar en Chrome/Safari */
            .results-card::-webkit-scrollbar {
                width: 8px;
            }

            .results-card::-webkit-scrollbar-track {
                background: #1E1E1E;
                border-radius: 4px;
            }

            .results-card::-webkit-scrollbar-thumb {
                background:rgb(148, 9, 9);
                border-radius: 4px;
            }

            .results-card::-webkit-scrollbar-thumb:hover {
                background:rgb(131, 16, 16);
            }

            .simulation-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 20px;
                background: #2D2D2D;
                border-radius: 8px;
            }

            .circuit-name, .driver-name {
                font-size: 1.5rem;
                font-weight: bold;
                color:rgb(139, 0, 0);
            }

            .weather-icon {
                font-size: 2rem;
            }

            .time-display {
                font-size: 2.5rem;
                text-align: center;
                font-weight: bold;
                color: #FFFFFF;
                padding: 20px;
                background: #2D2D2D;
                border-radius: 8px;
                margin: 20px 0;
            }

            .simulate-button {
                position: sticky;
                bottom: 0;
                margin-top: 20px;
                padding: 15px 30px;
                font-size: 1.2rem;
                background-color:rgb(2, 206, 2);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                width: 100%;
            }

            .simulate-button:hover {
                background-color:rgb(27, 112, 0);
            }

            .simulate-button:disabled {
                background-color: #424242;
                cursor: not-allowed;
            }

            .lap-times {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 10px;
                background: #2D2D2D;
                border-radius: 4px;
                color: #FFFFFF;
            }

            .completed-lap {
                background-color:rgb(39, 136, 45);
                color: #FFFFFF;
            }

            .simulation-title {
                font-size: 2rem;
                color:rgba(161, 1, 1, 0.85);
                text-align: center;
                margin-bottom: 20px;
                font-weight: bold;
            }

            .info-sections {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
            }

            .info-section {
                background: #2D2D2D;
                padding: 15px;
                border-radius: 8px;
            }

            .info-section h3 {
                color:rgb(145, 8, 8);
                margin-bottom: 15px;
                font-size: 1.2rem;
            }

            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 8px;
                background: #363636;
                border-radius: 4px;
                margin-bottom: 8px;
                color: #FFFFFF;
            }

            .time-display {
                font-size: 3rem;
                text-align: center;
                font-weight: bold;
                color: #FFFFFF;
                padding: 20px;
                background: #2D2D2D;
                border-radius: 8px;
                margin: 20px 0;
                font-family: monospace;
            }

            .completed-lap {
                background-color: #1B5E20;
                color: #FFFFFF;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    async saveSimulationResults(results) {
        try {
            const response = await fetch('http://localhost:3000/simulations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: new Date().toISOString(),
                    driverName: this.driver.name,
                    number: this.driver.number,
                    totalTime: results.currentTime,
                    lapTimes: this.driver.lapTimes.map((time, index) => ({
                        lap: index + 1,
                        time: this.formatTime(time)
                    }))
                })
            });

            if (!response.ok) {
                throw new Error('Error al guardar la simulación');
            }

            const savedData = await response.json();
            console.log('Simulación guardada exitosamente:', savedData);
            return savedData;
        } catch (error) {
            console.error('Error guardando la simulación:', error);
            throw error;
        }
    }

    simulateRace() {
        this.isSimulating = true;
        this.currentLap = 0;
        this.elapsedTime = 0;
        this.race.reset();
        this.results = [];

        const updateInterval = 100;

        this.intervalId = setInterval(async () => {
            if (this.currentLap >= this.race.circuit.laps) {
                console.log('Terminó la carrera');
                this.isSimulating = false;

                const finalResults = {
                    ...this.results,
                    circuit: this.circuitName,
                    car: this.car,
                    driver: this.driver,
                    currentTime: this.formatTime(this.elapsedTime)
                };

                this.updateResults(finalResults);

                // Guardar resultados al finalizar la simulación
                try {
                    await this.saveSimulationResults(finalResults);
                } catch (error) {
                    console.error('Error al guardar los resultados:', error);
                }

                clearInterval(this.intervalId);
                return;
            }

            let lapTime = 0;
            if ((lapTime = this.race.calculateLapTime()) === false) {
                console.log('Se acabó el combustible');
                this.isSimulating = false;

                this.updateResults({
                    ...this.results,
                    circuit: this.circuit,
                    car: this.car,
                    driver: this.driver,
                    currentTime: this.formatTime(this.elapsedTime)
                });

                clearInterval(this.intervalId);
                return;
            }

            this.driver.lapTimes.push(lapTime);
            this.driver.totalTime += lapTime;
            this.elapsedTime = this.driver.totalTime;

            this.results = this.race.getResults();

            this.updateResults({
                ...this.results,
                circuit: this.circuit,
                car: this.car,
                driver: this.driver,
                currentTime: this.formatTime(this.elapsedTime)
            });

            this.currentLap++;
        }, updateInterval);
    }

    parseTime(timeString) {
        const [mins, secs] = timeString.split(':');
        return (parseInt(mins) * 60) + parseFloat(secs);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = (seconds % 60).toFixed(3);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    updateResults(results) {
        const resultsCard = this.querySelector('.results-card');
        if (!resultsCard) return;

        const weatherIcons = {
            dry: 'Seco',
            rainy: 'Lluvia',
            extreme: 'Tormenta'
        };

        const lapRows = results.lapTimes
            .map((r, i) => `
                <div class="info-row ${this.currentLap >= i ? 'completed-lap' : ''}">
                    <span>Vuelta ${i + 1}</span>
                    <span>${this.currentLap >= i && r ? r.time : '--:--.---'}</span>
                </div>
            `)
            .join('');

        resultsCard.innerHTML = `
            <h2 class="simulation-title">Simulación</h2>

            <div class="info-sections">
                <div class="info-section">
                    <h3>🏁 Circuito</h3>
                    <div class="info-row">
                        <span>Nombre:</span>
                        <span>${this.circuit.name}</span>
                    </div>
                    <div class="info-row">
                        <span>Longitud:</span>
                        <span>${this.circuit.length} km</span>
                    </div>
                    <div class="info-row">
                        <span>Vueltas:</span>
                        <span>${this.circuit.laps}</span>
                    </div>
                    <div class="info-row">
                        <span>Clima:</span>
                        <span>${weatherIcons[this.circuit.weather] || weatherIcons.dry}</span>
                    </div>
                </div>

                <div class="info-section">
                    <h3>🏎️ Vehículo</h3>
                    <div class="info-row">
                        <span>Piloto:</span>
                        <span>${this.driver?.name || 'Sin piloto'}</span>
                    </div>
                    <div class="info-row">
                        <span>Número:</span>
                        <span>${this.driver?.number ?? '--'}</span>
                    </div>
                    <div class="info-row">
                        <span>Velocidad Máx:</span>
                        <span>${this.driver?.car?.maxSpeed} km/h</span>
                    </div>
                    <div class="info-row">
                        <span>Aceleración:</span>
                        <span>${this.driver?.car?.acceleration} s</span>
                    </div>
                    <div class="info-row">
                        <span>Combustible:</span>
                        <span>${this.driver?.car?.fuel.toFixed(0)} L</span>
                    </div>
                </div>
            </div>

            <div class="time-display">${results.currentTime || '0:00.000'}</div>

            <div class="lap-times">
                ${lapRows}
            </div>

            <button class="simulate-button" ${this.isSimulating ? 'disabled' : ''}>
                ${this.isSimulating ? 'Simulando...' : 'Iniciar Simulación'}
            </button>
        `;

        const button = resultsCard.querySelector('.simulate-button');
        button.addEventListener('click', () => this.simulateRace());
    }

    render() {
        this.innerHTML = `
            <div class="simulation-container">
                <div class="left-cards">
                    <div class="canvas-container">
                        <canvas id="circuitCanvas"></canvas>
                    </div>
                    <div class="canvas-container">
                        <canvas id="carCanvas"></canvas>
                    </div>
                </div>
                <div class="results-card">
                    <h2 class="simulation-title">Simulación</h2>
                    <div class="info-sections">
                        <div class="info-section">
                            <h3>🏁 Circuito</h3>
                            <div class="info-row">
                                <span>Nombre:</span>
                                <span>---</span>
                            </div>
                            <div class="info-row">
                                <span>Longitud:</span>
                                <span>--- km</span>
                            </div>
                            <div class="info-row">
                                <span>Vueltas:</span>
                                <span>---</span>
                            </div>
                            <div class="info-row">
                                <span>Clima:</span>
                                <span>---</span>
                            </div>
                        </div>

                        <div class="info-section">
                            <h3>🏎️ Vehículo</h3>
                            <div class="info-row">
                                <span>Piloto:</span>
                                <span>---</span>
                            </div>
                            <div class="info-row">
                                <span>Número:</span>
                                <span>--</span>
                            </div>
                            <div class="info-row">
                                <span>Velocidad Máx:</span>
                                <span>--- km/h</span>
                            </div>
                            <div class="info-row">
                                <span>Aceleración:</span>
                                <span>--- s</span>
                            </div>
                            <div class="info-row">
                                <span>Combustible:</span>
                                <span>--- L</span>
                            </div>
                        </div>
                    </div>
                    <div class="time-display">0:00.000</div>
                    <div class="lap-times">
                        <!-- Las vueltas se añadirán dinámicamente -->
                    </div>
                    <button class="simulate-button">Iniciar Simulación</button>
                </div>
            </div>
        `;

        const button = this.querySelector('.simulate-button');
        button.addEventListener('click', () => this.simulateRace());
    }
}

customElements.define('simulate-card', SimulateCard);

//simulacion.setAttribute('circuit-name', "pedro");
//simulacion.setAttribute('laps', 3 );
//simulacion.setAttribute('length',4);
//simulacion.setAttribute('acceleration', 2.3 );
//simulacion.setAttribute('max-speed', 340);
//simulacion.setAttribute('normal-speed',220);
//simulacion.setAttribute('pilot-name',"raul");
//simulacion.setAttribute('pilot-number', 2);