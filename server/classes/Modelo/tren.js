const {Movil} = require('./movil');

class Tren extends Movil{
    constructor(id,nombre,posicion){
        super(id,nombre,posicion);
    }
}

module.exports = {
    Tren
}