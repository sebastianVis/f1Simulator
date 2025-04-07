class Circuit {
    constructor(name, laps, length, weather) {
        this.name = name;
        this.laps = laps;
        this.length = length;
        this.weather = weather;
    }
}

class Car {
    constructor(acceleration, maxSpeed, normalSpeed, fuel = 100) {
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
}

class Driver {
    constructor(name, number, car) {
        this.name = name;
        this.number = number;
        this.car = car;
        this.lapTimes = [];
        this.totalTime = 0;
    }
}

class SingleDriverRace {
    constructor(circuit, driver) {
        this.circuit = circuit;
        this.driver = driver;
    }

    calculateLapTime() {
        const baseTime = (this.circuit.length / this.driver.car.normalSpeed) * 3600;
        const currentLap = this.driver.lapTimes.length + 1;
        
        const weatherEffect = {
            dry: 1,
            rainy: 1.2,
            extreme: 1.4
        }[this.circuit.weather];
        
        this.driver.car.currentTireWear += this.driver.car.tireWear[this.circuit.weather] * 0.1;
        const fuelEffect = this.driver.car.fuelConsumption[this.circuit.weather];
        this.driver.car.fuel -= fuelEffect;
        const randomFactor = 0.95 + Math.random() * 0.1;

        return baseTime * weatherEffect * this.driver.car.currentTireWear * (this.driver.car.fuel * 0.1) * randomFactor;
    }

    simulate() {
        this.driver.lapTimes = [];
        this.driver.totalTime = 0;

        for (let lap = 0; lap < this.circuit.laps; lap++) {
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

const monza = new Circuit("Monza", 2, 10, "extreme");
const car = new Car(2.6, 340, 320);
const driver = new Driver("Max Verstappen", 1, car);
const race = new SingleDriverRace(monza, driver);

race.simulate();
console.log(race.getResults());