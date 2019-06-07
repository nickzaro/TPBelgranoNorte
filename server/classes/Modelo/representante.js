const { Movil } = require('./primitivos/movil');
const { Posicion } = require('./primitivos/Posicion');
// const Parametros = require('../utilidades/parametros');

class Representante extends Movil {
    constructor(rep) { //numeroFormacion,PoolFormacion,posicion

        super(rep);
        this.cantidad = 0;
        this.pasajeros = [];
    }

    //enpaquetamos los datos para poder ser enviado a los clientes
    empaquetarParaEnviar() {
        return {
            id: this.id,
            nombre: this.nombre,
            posicion: this.calcularRepresentante().empaquetarParaEnviar(),
            cantidad: this.cantidad
        }
    }

    compararPaquetes(pa2) {
        let pa1 = empaquetarParaEnviar();
        return (pa1.id === pa2.id && pa1.nombre === pa2.nombre
            && pa1.compararPaquetes(pa2) && pa1.cantidad === pa2.cantidad);
    }
    agregarAlConjunto(pasajero) {
        sacarPersona(pasajero); // saco a la persona
        personas.push(pasajero); //agrego la updateada

    }

    agregarPersona(pasajero) {
        if (verificarPosicionPersona(pasajero)) {
            agregarAlPool(pasajero);
            return true;
        }
        return false;
    }

    sacarPersona(pasajero) {
        this.pasajeros = this.pasajeros.filter(p => p.id != pasajero.id);
    }

    //actualiza el representante de acuerdo a los clientes que tiene
    calcularRepresentante() {
        for (let persona of this.pasajeros) {
            this.posicion.sumarPosicion(persona.posicion);
        }
        this.posicion.dividirEntre(this.pasajeros.length)
        return this.posicion;
    }

    verificarPosicionPersona(pasajero) {
        //usando parametros verificamos si el pasajero pertenece a este viaje
        return true;
    }
}
module.exports = {
    Representante
}