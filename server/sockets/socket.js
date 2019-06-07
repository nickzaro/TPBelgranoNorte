const { io } = require('../server');
const {Representante} = require('../classes/Modelo/representante');

const {CargadorViajes} = require('./../classes/Controlador/cargador.viajes');


let reprePasa = new Representante('01', 'coche-01');
console.log(reprePasa.empaquetarParaEnviar());

let cargar = new CargadorViajes();

io.on('connection', (client) => {
    console.log("se conecto el cliente", client.id);
    client.emit('envioPrueba', reprePasa.empaquetarParaEnviar());

    client.on('disconnect', () => {
        console.log("se perdio coneccion con el cliente", client.id);
    })
});