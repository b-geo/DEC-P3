
const socket = io('http://localhost:4000');

socket.on('initial-state', (drivers) => {
    console.log("got it")
});

socket.on('position-update', (data) => {
    console.log(data)
});

