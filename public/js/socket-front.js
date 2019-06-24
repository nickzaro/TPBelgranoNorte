
var socket = io();
let enFuera = {
    id: 1,
    nombre: "movil-1",
    posicion: [-34.577614, -58.396424] //cerca de eestacion saldias
}

let enViaje = {
    id: 1,
    nombre: "pasajero-saldias-Retiro",
    posicion: [-34.5834132246055, -58.38547825813293]
}

let enEstacion = {
    id: 1,
    nombre: "pasajero-en-retiro",
    posicion: [-34.5901393264139, -58.37371945381165]
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
        pasajero: enFuera, // envio la posicion del cliente
        destinoID: parseInt(id) // envio el id de la estacion de destino
    });
}

socket.on('posicion-cliente', (resSegunEscenario) => {
    console.log(resSegunEscenario); // chequear el esenario
    let escenario = resSegunEscenario.escenario;
    if (escenario === dondeEsta.ESTACION) {
        aplicarEscenarioESTACION(resSegunEscenario);
    } else if (escenario === dondeEsta.VIAJE) {
        aplicarEscenarioVIAJE(resSegunEscenario);
    } else if (escenario === dondeEsta.FUERA) {
        aplicarEscenarioFUERA(resSegunEscenario);
    } else {
        console.log("no registrado el tipo de esenario");
        console.log(resSegunEscenario);
    }



})
function aplicarEscenarioFUERA(resSegunEscenario) {
    console.log(resSegunEscenario);
    Swal.fire(resSegunEscenario.estacion.nombre, "a " + Math.trunc(resSegunEscenario.distancia * 1000) + "metros", "aceptar");
}


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
        li.innerHTML = `<span onclick='seleccionar(this)'> ${ nuevoLi}</span>`;
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
    FUERA: 2,
    DESCONICIDO: 10
}

var distancias = {
    ESTACION: 0.050,  //50 metros de la estacion
    VIAJE: 0.010  // 20 metros del punto tren
}