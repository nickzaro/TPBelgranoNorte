var socket = io();


socket.on('connect',()=>{
    console.log("conectado al servidor");
});

socket.on('disconnect',()=>{
    console.log("Perdi conexion con el servidor");
});

socket.on('envioPrueba',(data)=>{
console.log(data);
});