document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.querySelector('#trackCanvas');
	const context = canvas.getContext('2d');
	const loadingElement = document.querySelector('#loading');
	const container = document.querySelector('#canvasContainer');
	const legendElement = document.querySelector('#legend');
	const leaderboardBody = document.querySelector('#leaderboardBody');
	const connectionStatus = document.querySelector('#connectionStatus');
	const socket = io();

	let trackCoordinates = [];
	let trackData = null;
	const cars = {}; // Store car positions: { carId: { x, y, color } }
	let animationFrameId = null;

	// Define some car colors
	const carColors = [
		'#FF0000', // Red
		'#0000FF', // Blue
		'#00FF00', // Green
		'#FFFF00', // Yellow
		'#FFA500', // Orange
		'#800080', // Purple
		'#00FFFF', // Cyan
		'#FF00FF', // Magenta
		'#FFFFFF', // White
		'#000000', // Black
	];

	const driver_team = {
		ALB: 'williams',
		ALO: 'aston_martin',
		ANT: 'mercedes',
		BEA: 'haas',
		BOR: 'sauber',
		DOO: 'alpine',
		GAS: 'alpine',
		HAD: 'rb',
		HAM: 'ferrari',
		HUL: 'sauber',
		LAW: 'rb',
		LEC: 'ferrari',
		NOR: 'mclaren',
		OCO: 'haas',
		PIA: 'mclaren',
		RUS: 'mercedes',
		SAI: 'williams',
		STR: 'aston_martin',
		TSU: 'red_bull',
		VER: 'red_bull',
	};
	const team_colour = {
		alpine: ['#00174c', '#fe88bd'],
		aston_martin: ['07565a', '#c5ce5e'],
		ferrari: ['#aa1e1c', '#fdea18'],
		haas: ['#e7e7e9', '#d6021f'],
		mclaren: ['#272b32', '#000000'],
		mercedes: ['#002420', '#08bdc9'],
		rb: ['#e5e6f2', '#1c67cc'],
		red_bull: ['#1f2737', '#e20620'],
		sauber: ['#8bd495', '#272b30'],
		williams: ['#1868dc', '#000000'],
	};

	// Set canvas dimensions based on container size
	function setCanvasDimensions() {
		const containerWidth = container.clientWidth;
		// Set a fixed aspect ratio (4:3)
		const aspectRatio = 4 / 3;
		const containerHeight = containerWidth / aspectRatio;

		// Set canvas dimensions with device pixel ratio for sharper display
		const dpr = window.devicePixelRatio || 1;
		canvas.width = containerWidth * dpr;
		canvas.height = containerHeight * dpr;

		// Set display size
		canvas.style.width = `${containerWidth}px`;
		canvas.style.height = `${containerHeight}px`;

		// Scale all drawing operations by dpr
		context.scale(dpr, dpr);

		// Store logical canvas dimensions
		canvas.logicalWidth = containerWidth;
		canvas.logicalHeight = containerHeight;

		// If we already have track data, redraw
		if (trackData) {
			drawScene();
		}
	}

	// Fetch the track data from the JSON file
	fetch('tracks/melb.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			return response.json();
		})
		.then(data => {
			trackCoordinates = data;
			loadingElement.style.display = 'none';

			// Process the track data once
			processTrackData();

			// Start rendering loop
			startRenderLoop();

			// Connect to WebSocket after track is loaded
			connectWebSocket();
		})
		.catch(error => {
			console.error('Error loading the track data:', error);
			loadingElement.textContent = 'Error loading track data. Please try again.';
		});

	// Process track data and cache calculations
	function processTrackData() {
		if (trackCoordinates.length === 0) {
			return;
		}

		// Find the bounds of the track
		let minX = Infinity; let
			minY = Infinity;
		let maxX = -Infinity; let
			maxY = -Infinity;

		for (const point of trackCoordinates) {
			minX = Math.min(minX, point[0]);
			minY = Math.min(minY, point[1]);
			maxX = Math.max(maxX, point[0]);
			maxY = Math.max(maxY, point[1]);
		}

		// Store the processed data
		trackData = {
			minX, minY, maxX, maxY,
			width: maxX - minX,
			height: maxY - minY,
		};
	}

	// Convert track coordinates to canvas coordinates
	function trackToCanvas(x, y) {
		if (!trackData) {
			return {x: 0, y: 0};
		}

		const canvasWidth = canvas.logicalWidth;
		const canvasHeight = canvas.logicalHeight;
		const padding = 40;

		const xScale = (canvasWidth - padding) / trackData.width;
		const yScale = (canvasHeight - padding) / trackData.height;
		const baseScale = Math.min(xScale, yScale);

		const scaledWidth = trackData.width * baseScale;
		const scaledHeight = trackData.height * baseScale;
		const centerX = (canvasWidth - scaledWidth) / 2;
		const centerY = (canvasHeight - scaledHeight) / 2;

		return {
			x: centerX + (x - trackData.minX) * baseScale,
			y: centerY + (y - trackData.minY) * baseScale,
		};
	}

	function drawTrack() {
		if (!trackData) {
			return;
		}

		// Get logical canvas dimensions (without DPR scaling)
		const canvasWidth = canvas.logicalWidth;
		const canvasHeight = canvas.logicalHeight;

		// Clear the canvas - use logical dimensions
		context.clearRect(0, 0, canvasWidth, canvasHeight);

		// Calculate the scaling to fit the canvas with padding
		const padding = 40; // Padding in pixels
		const xScale = (canvasWidth - padding) / trackData.width;
		const yScale = (canvasHeight - padding) / trackData.height;
		const baseScale = Math.min(xScale, yScale);

		// Center the track on the canvas
		const scaledWidth = trackData.width * baseScale;
		const scaledHeight = trackData.height * baseScale;
		const centerX = (canvasWidth - scaledWidth) / 2;
		const centerY = (canvasHeight - scaledHeight) / 2;

		// Draw the track outline
		context.beginPath();
		for (const [index, point] of trackCoordinates.entries()) {
			const x = centerX + (point[0] - trackData.minX) * baseScale;
			const y = centerY + (point[1] - trackData.minY) * baseScale;

			if (index === 0) {
				context.moveTo(x, y);
			} else {
				context.lineTo(x, y);
			}
		}

		context.closePath();

		// Fill the track
		context.fillStyle = '#e6e6e6';
		context.fill();

		// Draw the track outline with anti-aliasing
		context.strokeStyle = '#e10600';
		context.lineWidth = 2;
		context.lineJoin = 'round';
		context.lineCap = 'round';
		context.stroke();

		// Draw the start/finish line
		const startPoint = trackCoordinates[0];
		const startX = centerX + (startPoint[0] - trackData.minX) * baseScale;
		const startY = centerY + (startPoint[1] - trackData.minY) * baseScale;

		context.beginPath();
		context.strokeStyle = '#000';
		context.lineWidth = 3;
		context.moveTo(startX - 15, startY);
		context.lineTo(startX + 15, startY);
		context.stroke();

		// Draw the track name
		const fontSize = Math.max(16, Math.min(20, canvasWidth / 30));
		context.font = `bold ${fontSize}px Arial`;
		context.fillStyle = '#333';
		context.textAlign = 'center';
		context.fillText('Melbourne Grand Prix Circuit', canvasWidth / 2, fontSize * 1.5);
	}

	// Draw cars on the track
	function drawCars() {
		if (!trackData) {
			return;
		}

		// Car size relative to canvas width
		const carRadius = Math.max(5, Math.min(8, canvas.logicalWidth / 100));
		const now = Date.now();
		const staleThreshold = 5000; // Consider data stale after 5 seconds

		for (const [carId, car] of Object.entries(cars)) {
			// Skip cars with stale data
			if (now - car.lastUpdate > staleThreshold) {
				continue;
			}

			// Convert car coordinates to canvas coordinates
			const canvasPos = trackToCanvas(car.x, car.y);

			// Draw car
			context.beginPath();
			context.arc(canvasPos.x, canvasPos.y, carRadius, 0, Math.PI * 2);
			context.fillStyle = car.color;
			context.fill();
			context.strokeStyle = car.line;
			context.lineWidth = 1;
			context.stroke();

			// Draw car identifier (driver code)
			context.font = `bold ${carRadius}px Arial`;
			context.fillStyle = '#FFFFFF';
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillText(carId, canvasPos.x, canvasPos.y);

			// Draw additional info (speed, lap)
			context.font = `${carRadius * 0.8}px Arial`;
			context.fillStyle = '#333';
			context.textAlign = 'center';
			context.textBaseline = 'top';
			context.fillText(`${Math.round(car.speed)} km/h`, canvasPos.x, canvasPos.y + carRadius + 2);
			context.fillText(`Lap ${car.lap}`, canvasPos.x, canvasPos.y + carRadius + carRadius * 1.5);
		}
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
			connectionStatus.textContent = 'Connected';
			connectionStatus.classList.remove('disconnected');
			connectionStatus.classList.add('connected');
		});

		// Listen for telemetry updates
		socket.on('position-update', data => {
			// Format: {"Date":1742098702974,"SessionTime":4260355,"DriverAhead":"","DistanceToDriverAhead":0.2,"RPM":10114.3998848,"Speed":0.0,"nGear":2,"Throttle":16.0,"Brake":true,"DRS":1,"Distance":-0.0016174214,"RelativeDistance":-0.0000000054,"Status":"OnTrack","X":-941.083631066,"Y":-1575.8587888095,"Z":86.0000000914,"Lap":2,"Driver":"VER","date_delta":0}

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
		socket.on('connect_error', error => {
			console.error('WebSocket connection error:', error);
			connectionStatus.textContent = 'Connection Error';
			connectionStatus.classList.remove('connected');
			connectionStatus.classList.add('disconnected');
		});

		// Handle disconnection
		socket.on('disconnect', reason => {
			console.warn('WebSocket disconnected:', reason);
			connectionStatus.textContent = 'Disconnected';
			connectionStatus.classList.remove('connected');
			connectionStatus.classList.add('disconnected');
		});
	}

	// Update the legend based on current cars
	function updateLegend() {
		// Clear the legend
		legendElement.innerHTML = '';

		// Add an item for each car
		for (const [driverId, car] of Object.entries(cars)) {
			const legendItem = document.createElement('div');
			legendItem.className = 'legend-item';

			const colorBox = document.createElement('div');
			colorBox.className = 'car-color';
			colorBox.style.backgroundColor = car.color;
			colorBox.style.borderColor = car.line;

			const driverText = document.createElement('span');
			driverText.textContent = driverId;

			legendItem.append(colorBox);
			legendItem.append(driverText);
			legendElement.append(legendItem);
		}
	}

	// Update the leaderboard
	function updateLeaderboard() {
		// Get an array of cars and sort by lap (descending) and then by relative distance
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
				// Sort by lap (descending)
				if (b.lap !== a.lap) {
					return b.lap - a.lap;
				}

				// If same lap, could sort by track position, but we don't have that data
				// Just sort by driver ID for consistency
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

	// Initialize canvas dimensions
	setCanvasDimensions();

	// Handle window resize
	window.addEventListener('resize', () => {
		setCanvasDimensions();
	});
});
