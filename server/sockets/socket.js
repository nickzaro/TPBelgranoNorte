const { io } = require('../server');
const {Representante} = require('../classes/Modelo/representante');

const {ManejadorViajes} = require('../classes/Controlador/manejador.viajes');

let repRaw = {
    id: 1,
    nombre: "movil-1",
    posicion: [10, 20.2]
};
let reprePasa = new Representante(repRaw);
console.log(reprePasa.empaquetarParaEnviar());

let manejador = new ManejadorViajes();

io.on('connection', (client) => {
    console.log("se conecto el cliente", client.id);
    


    //esta es la funcionalidad que se encarga
    client.on('posicion-cliente',(pasajero)=>{
        
        
        console.log("devolver el estado del viaje en un callback");
        //tiene que haber una variable que indique si se le envia todo 
        // y estaciones(primera vez que se conecta o cambia de coche) 
        // o solo actualizar la situacion, para que elcliente sepa que leer
       client.emit('posicion-cliente',manejador.armarViaje(pasajero)); 
    })

    client.on('disconnect', () => {
        console.log("se perdio coneccion con el cliente", client.id);
    })
});

//enviar las estaciones con el recorrido segun horario sistema
function recorridoSegunEstado(){
return "servidor envia:las estaciones con el recorrido segun horario sistema";
}