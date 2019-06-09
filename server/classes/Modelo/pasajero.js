const { Movil } = require('./primitivos/movil');

class Pasajero extends Movil {
    constructor(pasajeroRaw) {
        super(pasajeroRaw);
    }
}

module.exports = {
    Pasajero
}