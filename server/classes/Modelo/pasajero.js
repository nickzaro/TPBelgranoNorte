const { Movil } = require('./primitivos/movil');

class Pasajero extends Movil {
    constructor(pasajero) {
        super(pasajero);
    }
}

module.exports = {
    Pasajero
}