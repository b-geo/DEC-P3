
const socket = io('http://localhost:4000');
const track = document.getElementById('track-container');
const cars = new Map();

// Track dimensions (adjust based on your coordinate system)
const TRACK_WIDTH = 3000;
const TRACK_HEIGHT = 2000;

socket.on('initial-state', (drivers) => {
    console.log("got it")
    drivers.forEach(createOrUpdateCar);
});

socket.on('position-update', (data) => {
    console.log("got it2")
    createOrUpdateCar(data);
});

function createOrUpdateCar(data) {
    let car = cars.get(data.Driver);

    if (!car) {
        car = document.createElement('div');
        car.className = 'car';
        car.textContent = data.Driver;
        car.style.backgroundColor = getDriverColor(data.Driver);
        track.appendChild(car);
        cars.set(data.Driver, car);
    }

    // Scale coordinates to fit container
    const x = ((data.X + TRACK_WIDTH/2) / TRACK_WIDTH) * 100;
    const y = ((data.Y + TRACK_HEIGHT/2) / TRACK_HEIGHT) * 100;

    car.style.left = `${x}%`;
    car.style.top = `${y}%`;

    // Add tooltip with more info
    car.title = `Speed: ${data.Speed} km/h\\nLap: ${data.Lap}\\nGear: ${data.nGear}`;
    }

    function getDriverColor(driverCode) {
    // Map driver codes to team colors
    const teamColors = {
        'VER': '#0600EF', // Red Bull
        'HAM': '#00D2BE', // Mercedes
        'LEC': '#DC0000', // Ferrari
        'NOR': '#FF8700', // McLaren
        // Add more drivers
    };
    return teamColors[driverCode] || '#FFFFFF';
}

// Handle window resize
window.addEventListener('resize', scaleTrack);
scaleTrack();

function scaleTrack() {
    const containerRatio = track.clientWidth / track.clientHeight;
    const trackRatio = TRACK_WIDTH / TRACK_HEIGHT;

    if (containerRatio > trackRatio) {
        // Container is wider than track
        track.style.backgroundSize = 'auto 100%';
    } else {
        // Container is taller than track
        track.style.backgroundSize = '100% auto';
    }
}