const { io } = require('../server');
const { Representante } = require('../classes/Modelo/representante');

const { ManejadorViajes } = require('../classes/Controlador/manejador.viajes');

let manejador = new ManejadorViajes();

io.on('connection', (client) => {
    console.log("se conecto el cliente", client.id);
    console.log("envio las Estaciones");
    client.emit("estaciones", manejador.getEstacionesRaw());


    //esta es la funcionalidad que se encarga
    client.on('posicion-cliente', (PasajeroDestino) => {
        console.log("recibo el cliente + destino",PasajeroDestino);
        
        //esta funcion retornaria una funcion para
        manejador.construirViaje(PasajeroDestino);

        //console.log("devolver el estado del viaje en un callback");
        //tiene que haber una variable que indique si se le envia todo 
        // y estaciones(primera vez que se conecta o cambia de coche) 
        // o solo actualizar la situacion, para que elcliente sepa que leer
        //client.emit('posicion-cliente',manejador.armarViaje(pasajero)); 
    })

    client.on('disconnect', () => {
        console.log("se perdio conexion con el cliente", client.id);
    })
});



//enviar las estaciones con el recorrido segun horario sistema
function recorridoSegunEstado() {
    return "servidor envia:las estaciones con el recorrido segun horario sistema";
}