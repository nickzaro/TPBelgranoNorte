// creo que sera una funcion utilitaria para  exportar/importar pasajero
// y manejar todo la clas clases del modelo, una lista de viajes tendra
const { Representante } = require('../Modelo/representante');
const { Tren } = require('../Modelo/tren');
const estaciones = require('./estaciones.json');

class viaje {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.representante = new Representante();
        this.tren = new Tren();
    }

    getRepresentante() {
        return this.representante;
    }

    getTren() {
        return this.tren;
    }
}
