document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const canvas = document.getElementById('trackCanvas');
    const ctx = canvas.getContext('2d');
    const loadingEl = document.getElementById('loading');
    const container = document.getElementById('canvasContainer');
    const legendEl = document.getElementById('legend');
    const leaderboardBody = document.getElementById('leaderboardBody');
    const connectionStatus = document.getElementById('connectionStatus');
    const connectionIcon = document.getElementById('connectionIcon');
    const connectionText = document.getElementById('connectionText');
    
    // Initialize socket connection
    const socket = io();
    
    // Track and car data
    let trackCoordinates = [];
    let trackData = null;
    let cars = {}; // Store car positions: { carId: { x, y, color, line, speed, lap, lastUpdate } }
    let animationFrameId = null;
    
    // Team colors - modern F1 styling
    const driver_team = {
        "ALB": "williams",
        "ALO": "aston_martin",
        "ANT": "mercedes",
        "BEA": "haas",
        "BOR": "sauber",
        "DOO": "alpine",
        "GAS": "alpine",
        "HAD": "rb",
        "HAM": "ferrari",
        "HUL": "sauber",
        "LAW": "rb",
        "LEC": "ferrari",
        "NOR": "mclaren",
        "OCO": "haas",
        "PIA": "mclaren",
        "RUS": "mercedes",
        "SAI": "williams",
        "STR": "aston_martin",
        "TSU": "red_bull",
        "VER": "red_bull"
    };
    
    const team_colour = {
        "alpine": ["#0090FF", "#FF79C9"], // Updated colors
        "aston_martin": ["#006F62", "#00594F"], 
        "ferrari": ["#F91536", "#FFF200"], 
        "haas": ["#FFFFFF", "#B6BABD"], 
        "mclaren": ["#FF8700", "#0070D0"], 
        "mercedes": ["#00D2BE", "#00A298"], 
        "rb": ["#6692FF", "#00316E"],  
        "red_bull": ["#3671C6", "#EE0000"], 
        "sauber": ["#52E252", "#00E701"], 
        "williams": ["#0093EF", "#00F0FF"]
    };
    
    // Set canvas dimensions with device pixel ratio for sharp rendering
    function setCanvasDimensions() {
        const containerWidth = container.clientWidth;
        // Set a fixed aspect ratio (16:9 for widescreen look)
        const aspectRatio = 16/9;
        const containerHeight = containerWidth / aspectRatio;
        
        // Set canvas dimensions with device pixel ratio for sharper display
        const dpr = window.devicePixelRatio || 1;
        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        
        // Set display size
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
        
        // Scale all drawing operations by dpr
        ctx.scale(dpr, dpr);
        
        // Store logical canvas dimensions
        canvas.logicalWidth = containerWidth;
        canvas.logicalHeight = containerHeight;
        
        // If we already have track data, redraw
        if (trackData) {
            drawScene();
        }
    }
    
    // Fetch track data
    function fetchTrackData() {
        // Show loading animation
        loadingEl.style.display = 'flex';
        
        fetch('tracks/melb.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                trackCoordinates = data;
                loadingEl.style.display = 'none';
                
                // Process the track data
                processTrackData();
                
                // Start rendering loop
                startRenderLoop();
                
                // Connect to WebSocket after track is loaded
                connectWebSocket();
            })
            .catch(error => {
                console.error('Error loading the track data:', error);
                loadingEl.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>Error loading track data. Please try again.</span>
                `;
            });
    }
    
    // Process track data and cache calculations
    function processTrackData() {
        if (!trackCoordinates.length) return;
        
        // Find the bounds of the track
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;
        
        trackCoordinates.forEach(point => {
            minX = Math.min(minX, point[0]);
            minY = Math.min(minY, point[1]);
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
        });
        
        // Store the processed data
        trackData = {
            minX, minY, maxX, maxY,
            width: maxX - minX,
            height: maxY - minY
        };
    }
    
    // Convert track coordinates to canvas coordinates
    function trackToCanvas(x, y) {
        if (!trackData) return { x: 0, y: 0 };
        
        const canvasWidth = canvas.logicalWidth;
        const canvasHeight = canvas.logicalHeight;
        const padding = 40;
        
        const xScale = (canvasWidth - padding * 2) / trackData.width;
        const yScale = (canvasHeight - padding * 2) / trackData.height;
        const baseScale = Math.min(xScale, yScale);
        
        const scaledWidth = trackData.width * baseScale;
        const scaledHeight = trackData.height * baseScale;
        const centerX = (canvasWidth - scaledWidth) / 2;
        const centerY = (canvasHeight - scaledHeight) / 2;
        
        return {
            x: centerX + (x - trackData.minX) * baseScale,
            y: centerY + (y - trackData.minY) * baseScale
        };
    }
    
    // Draw the track
    function drawTrack() {
        if (!trackData) return;
        
        // Get logical canvas dimensions
        const canvasWidth = canvas.logicalWidth;
        const canvasHeight = canvas.logicalHeight;
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Calculate the scaling to fit the canvas with padding
        const padding = 40;
        const xScale = (canvasWidth - padding * 2) / trackData.width;
        const yScale = (canvasHeight - padding * 2) / trackData.height;
        const baseScale = Math.min(xScale, yScale);
        
        // Center the track on the canvas
        const scaledWidth = trackData.width * baseScale;
        const scaledHeight = trackData.height * baseScale;
        const centerX = (canvasWidth - scaledWidth) / 2;
        const centerY = (canvasHeight - scaledHeight) / 2;
        
        // Draw a subtle grid background
        drawGrid(canvasWidth, canvasHeight);
        
        // Draw track outline
        ctx.beginPath();
        trackCoordinates.forEach((point, index) => {
            const x = centerX + (point[0] - trackData.minX) * baseScale;
            const y = centerY + (point[1] - trackData.minY) * baseScale;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        
        // Draw track outer stroke for glow effect
        ctx.strokeStyle = '#e10600'; // F1 red
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Fill the track with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
        gradient.addColorStop(0, '#2a2a38');
        gradient.addColorStop(1, '#1e1e26');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw track border
        ctx.strokeStyle = '#e10600';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw the start/finish line
        const startPoint = trackCoordinates[0];
        const startX = centerX + (startPoint[0] - trackData.minX) * baseScale;
        const startY = centerY + (startPoint[1] - trackData.minY) * baseScale;
        
        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.moveTo(startX - 20, startY);
        ctx.lineTo(startX + 20, startY);
        ctx.stroke();
    
    }
    
    // Draw grid background
    function drawGrid(width, height) {
        const gridSize = 40;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        
        // Draw vertical lines
        for (let x = 0; x <= width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = 0; y <= height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }
    
    // Draw cars on the track
    function drawCars() {
        if (!trackData) return;
        
        // Car size relative to canvas width
        const carRadius = Math.max(6, Math.min(10, canvas.logicalWidth / 80));
        const now = Date.now();
        const staleThreshold = 5000; // Consider data stale after 5 seconds
        
        Object.entries(cars).forEach(([carId, car]) => {
            // Skip cars with stale data
            if (now - car.lastUpdate > staleThreshold) return;
            
            // Convert car coordinates to canvas coordinates
            const canvasPos = trackToCanvas(car.x, car.y);
            
            // Draw car glow
            ctx.beginPath();
            ctx.arc(canvasPos.x, canvasPos.y, carRadius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${hexToRgb(car.line)}, 0.3)`;
            ctx.fill();
            
            // Draw car
            ctx.beginPath();
            ctx.arc(canvasPos.x, canvasPos.y, carRadius, 0, Math.PI * 2);
            ctx.fillStyle = car.color;
            ctx.fill();
            ctx.strokeStyle = car.line;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw car identifier (driver code)
            ctx.font = `bold ${carRadius * 0.8}px Arial`;
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(carId, canvasPos.x, canvasPos.y);
            
        });
    }
    
    // Draw everything
    function drawScene() {
        drawTrack();
        drawCars();
    }
    
    // Start animation loop
    function startRenderLoop() {
        // Cancel any existing animation frame
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        // Animation loop
        function animate() {
            drawScene();
            animationFrameId = requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Connect to WebSocket server
    function connectWebSocket() {
        // Update connection status when connected
        socket.on('connect', () => {
            updateConnectionStatus('Connected');
        });
        
        // Listen for telemetry updates
        socket.on('position-update', data => {
            // Extract the driver and position data
            const driverId = data.Driver;
            const x = data.X;
            const y = data.Y;

            // Only process data for cars that are "OnTrack"
            if (data.Status === 'OnTrack') {
                // If this is a new car, assign a color
                if (cars[driverId]) {
                    // Update existing car position
                    cars[driverId].x = x;
                    cars[driverId].y = y;
                    cars[driverId].speed = data.Speed;
                    cars[driverId].lap = data.Lap;
                    cars[driverId].distance = data.Distance; // Add this line
                    cars[driverId].lastUpdate = Date.now();
                } else {
                    const dt = driver_team[driverId];
                    const tc = team_colour[dt];

                    cars[driverId] = {
                        x,
                        y,
                        color: tc[0],
                        line: tc[1],
                        speed: data.Speed,
                        lap: data.Lap,
                        distance: data.Distance, // Add this line
                        lastUpdate: Date.now(),
                    };

                    // Add to the legend
                    updateLegend();
                }

                // Update the leaderboard
                updateLeaderboard();
            }
        });
        // Handle connection errors
        socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
            updateConnectionStatus('Disconnected');
        });
        
        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.warn('WebSocket disconnected:', reason);
            updateConnectionStatus('Disconnected');
        });
    }
    
    // Update connection status indicator
    function updateConnectionStatus(status) {
        connectionStatus.textContent = status;
        
        if (status === 'Connected') {
            connectionStatus.classList.remove('disconnected');
            connectionStatus.classList.add('connected');
            connectionText.textContent = 'CONNECTED';
        } else {
            connectionStatus.classList.remove('connected');
            connectionStatus.classList.add('disconnected');
            connectionText.textContent = 'DISCONNECTED';
        }
    }
    
    // Update the legend based on current cars
    function updateLegend() {
        // Clear the legend
        legendEl.innerHTML = '';
        
        // Add an item for each car
        Object.entries(cars).forEach(([driverId, car]) => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            
            const colorBox = document.createElement('div');
            colorBox.className = 'car-color';
            colorBox.style.backgroundColor = car.color;
            colorBox.style.borderColor = car.line;
            colorBox.textContent = driverId;
            
            const driverText = document.createElement('span');
            driverText.textContent = getDriverFullName(driverId);
            
            legendItem.appendChild(colorBox);
            legendItem.appendChild(driverText);
            legendEl.appendChild(legendItem);
        });
    }
    
    // Update the leaderboard
    function updateLeaderboard() {
        // Get an array of cars and sort by race position
        const carArray = Object.entries(cars)
            .map(([driverId, car]) => ({
                id: driverId,
                ...car,
            }))
            .filter(car => {
                // Filter out stale data (cars that haven't been updated recently)
                const now = Date.now();
                return now - car.lastUpdate < 5000; // 5 seconds threshold
            })
            .sort((a, b) => {
                // Calculate total distance for each car
                // Total distance = (completed laps * lap distance) + current lap distance
                // Since we don't know the exact lap length, we'll use a large multiplier
                // to ensure lap differences are more significant than distance differences
                const lapMultiplier = 10000; // Adjust this if needed based on your track
                
                const totalDistanceA = (a.lap - 1) * lapMultiplier + a.distance;
                const totalDistanceB = (b.lap - 1) * lapMultiplier + b.distance;
                
                // Sort by total distance (descending - highest distance first)
                if (totalDistanceB !== totalDistanceA) {
                    return totalDistanceB - totalDistanceA;
                }
                
                // If somehow total distances are equal, sort by driver ID for consistency
                return a.id.localeCompare(b.id);
            });

        // Clear the leaderboard
        leaderboardBody.innerHTML = '';

        // Add rows for each car
        for (const [index, car] of carArray.entries()) {
            const row = document.createElement('tr');

            // Position
            const posCell = document.createElement('td');
            posCell.textContent = index + 1;
            row.append(posCell);

            // Driver ID
            const driverCell = document.createElement('td');
            driverCell.textContent = car.id;
            driverCell.style.color = car.color;
            driverCell.style.fontWeight = 'bold';
            row.append(driverCell);

            // Lap
            const lapCell = document.createElement('td');
            lapCell.textContent = car.lap;
            row.append(lapCell);

            // Speed
            const speedCell = document.createElement('td');
            speedCell.textContent = `${Math.round(car.speed)} km/h`;
            row.append(speedCell);

            // Last update
            const updateCell = document.createElement('td');
            const secondsAgo = Math.round((Date.now() - car.lastUpdate) / 1000);
            updateCell.textContent = `${secondsAgo}s ago`;
            row.append(updateCell);

            leaderboardBody.append(row);
        }
    }
    
    // Helper function to get full driver name (would be replaced with real names in production)
    function getDriverFullName(driverId) {
        const driverNames = {
            'VER': 'Max Verstappen',
            'HAM': 'Lewis Hamilton',
            'NOR': 'Lando Norris',
            'LEC': 'Charles Leclerc',
            'SAI': 'Carlos Sainz',
            'ALO': 'Fernando Alonso',
            'RUS': 'George Russell',
            'PIA': 'Oscar Piastri',
            'STR': 'Lance Stroll',
            'GAS': 'Pierre Gasly',
            'ALB': 'Alexander Albon',
            'HUL': 'Nico Hulkenberg',
            'TSU': 'Yuki Tsunoda',
            'HAD': 'D. Hadjar',
            'BOR': 'V. Bottas',
            'OCO': 'Esteban Ocon',
            'BEA': 'O. Bearman',
            'ANT': 'A. Antonelli',
            'LAW': 'L. Lawson',
            'DOO': 'J. Doohan'
        };
        
        return driverNames[driverId] || driverId;
    }
    
    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
        // Remove the hash if it exists
        hex = hex.replace('#', '');
        
        // Parse the hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return `${r}, ${g}, ${b}`;
    }
    
    // Initialize canvas dimensions
    setCanvasDimensions();
    
    // Fetch track data
    fetchTrackData();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasDimensions();
    });
});