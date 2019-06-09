var socket = io();
let mov = {
    id: 1,
    nombre: "movil-1",
    posicion: [-34.577614, -58.396424] //cerca de eestacion saldias
}
socket.on('connect', () => {
    console.log("me conecte al servidor");
});

socket.on('disconnect', () => {
    console.log("Perdi la conexion con el servidor");
});

socket.on("estaciones", (estaciones) => {
    console.log(estaciones);
    estacionesAlDOM(estaciones); // dibujo las estaciones
});






//envia la posicion del cliente mas el destino
function enviarDestinoPosicion(id) {
    socket.emit('posicion-cliente', {
        pasajero: mov, // envio la posicion del cliente
        destinoID: id // envio el id de la estacion de destino
    });
}

socket.on('posicion-cliente', (resSegunEsenario) => {
    console.log(resSegunEsenario);
    alert(resSegunEsenario.estacion.nombre + " a: " + Math.trunc(resSegunEsenario.distancia * 1000) + " metros");

})



function estacionesAlDOM(estaciones) {
    for (let estacion of estaciones) {
        agregarALista(estacion);
    }
}

function agregarALista(estacion) {


    var nuevoLi = estacion.nombre;
    if (nuevoLi.length > 0) {
        var li = document.createElement('li');
        li.id = estacion.id;
        li.innerHTML = "<span onclick='seleccionar(this)'> o </span>" + nuevoLi;
        document.getElementById("listas").appendChild(li);

    }
    return false;
}
// el evento click de la vista para elegir estaciones
function seleccionar(elemento) {
    let id = elemento.parentNode.getAttribute("id");
    //node=document.getElementById(id);
    //node.parentNode.removeChild(node);
    enviarDestinoPosicion(id);
}

var dondeEsta = {
    ESTACION: 0,
    VIAJE: 1,
    FUERA: 2
}