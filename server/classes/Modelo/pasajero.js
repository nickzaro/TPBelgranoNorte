const { Movil } = require('./primitivos/movil');
const parametros = require('../../utilidades/parametros');

class Pasajero extends Movil {
    constructor(id, nombre, posicion) {
        super(id, nombre, posicion);
    }
}

module.exports = {
    Pasajero
}