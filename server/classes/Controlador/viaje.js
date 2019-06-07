// creo que sera una funcion utilitaria para  exportar/importar pasajero
// y manejar todo la clas clases del modelo, una lista de viajes tendra
const { Representante } = require('../Modelo/representante');
const { Tren } = require('../Modelo/tren');
const estaciones = require('./estaciones.json');

class viaje {
    constructor(id, nombre, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
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
