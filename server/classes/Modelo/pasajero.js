const { Movil } = require('./primitivos/movil');
const parametros = require('../../utilidades/parametros');

class Pasajero extends Movil {
    constructor(pasajero) {
        super(pasajero);
    }
}

module.exports = {
    Pasajero
}