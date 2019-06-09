const {Movil} = require('./movil');

class Tren extends Movil{
    constructor(trenRaw){
        super(trenRaw);
    }
}

module.exports = {
    Tren
}