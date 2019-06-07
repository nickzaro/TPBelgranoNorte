var socket = io();

let mov = {
    id: 1,
    nombre: "movil-1",
    posicion: [10, 20.2]
}
socket.on('connect', () => {
    console.log("conectado al servidor");
    mov.id=socket.id;
    mov.nombre = socket.id;
    socket.emit("posicion-cliente", mov);

});

socket.on('disconnect', () => {
    console.log("Perdi conexion con el servidor");
});

socket.on('envioPrueba', (data) => {
    console.log(data);
});


socket.on('posicion-cliente', (data) => {
    console.log(data);
});

