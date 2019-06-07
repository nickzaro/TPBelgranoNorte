const { Movil} = require('./primitivos/movil');
const {Posicion} = require('./primitivos/Posicion');
// const Parametros = require('../utilidades/parametros');

class Representante extends Movil {
    constructor(id, nombre) { //numeroFormacion,PoolFormacion,posicion
        super(id, nombre, new Posicion(0.0, 0.0));
        this.cantidad = 0;
        this.pasajeros = [];
    }

//enpaquetamos los datos para poder ser enviado a los clientes
    empaquetarParaEnviar() {
        return {
            id: this.id,
            nombre: this.nombre,
            posicion: this.representaAlPool().empaquetarParaEnviar(),
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

    representaAlPool() {
        let posicion = new Posicion(0.0, 0.0);
        for (let persona of this.pasajeros) {
            posicion.sumarPosicion(persona.posicion);
        }
        posicion.dividirEntre(this.pasajeros.length)
        return posicion;
    }

    verificarPosicionPersona(pasajero) {
        //usando parametros verificamos si el pasajero pertenece a este viaje
        return true;
    }
}
module.exports = {
    Representante
}