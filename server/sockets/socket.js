const { io } = require('../server');
const { Representante } = require('../classes/Modelo/representante');

const { ManejadorViajes } = require('../classes/Controlador/manejador.viajes');

let manejador = new ManejadorViajes();

io.on('connection', (client) => {
    console.log("se conecto el cliente", client.id);
    console.log("envio las Estaciones");
    client.emit("estaciones", manejador.getEstacionesRaw());


    client.on('posicion-cliente', (PasajeroDestino) => {
        console.log("recibo el cliente + destino", PasajeroDestino);

        client.emit('posicion-cliente', manejador.construirViaje(PasajeroDestino));
    })

    client.on('disconnect', () => {
        console.log("se perdio conexion con el cliente", client.id);
    })
});



//enviar las estaciones con el recorrido segun horario sistema
function recorridoSegunEstado() {
    return "servidor envia:las estaciones con el recorrido segun horario sistema";
}