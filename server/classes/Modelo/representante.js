const { Movil } = require('./primitivos/movil');
const { Posicion } = require('./primitivos/Posicion');
const { Pasajero } = require('./pasajero');
// const Parametros = require('../utilidades/parametros');


//SERA QUE PONGO LA POSICION INICIAL USANDO LA DEL TREN SEGUN EL HORARIO
// Y LA POSICION DEL QUE SE CONECTA?, O ARMO UN REPRESENTANTE SOLO
//SABIENDO LA HORA DEL SISTEMA

//O TOMO SOLO [0,0] Y SEGUN SE CONECTAN VOY UBICANDO DONDE ESTA 
class Representante extends Movil {
    constructor(repRaw) { //numeroFormacion,PoolFormacion,posicion

        super(repRaw);
        this.pasajeros = new Map();
        this.cantidad = this.getCantidad();
    }

    //enpaquetamos los datos para poder ser enviado a los clientes
    empaquetarParaEnviar() {
        let rep = super.empaquetarParaEnviar();

        return {
            id: rep.id,
            nombre: rep.nombre,
            posicion: rep.posicion,
            cantidad: this.getCantidad()
        }
    }
    // no usamos por ahora
    verificarPosicionPasajero(pasajero) {
        //usando parametros verificamos si el pasajero pertenece a este viaje
        return true;
    }
    //agrega un pasajero si es que cumple con estar en el rango
    // del representant
    agregarPasajero(pasajero) {
        if (this.verificarPosicionPasajero(pasajero)) {
            this.agregarAPasajeros(pasajero);
            this.actualizarRepresentante();
            return true;
        }
        return false;
    }
    //sacar un pasajero que existia
    sacarPasajero(pasajero) {
        this.pasajeros.delete(pasajero.getID());
        this.actualizarRepresentante();
    }

    
    //actualiza el representante de acuerdo a los clientes que tiene
    actualizarRepresentante() {
        this.posicion.resetPosicion();// limpio la poscion representante
        for (let [clave, valor] of this.pasajeros) {
            // console.log("PASAJERO:", valor);
            this.getPosicion().sumarPosicion(valor.getPosicion());
        }
        if (this.getCantidad() > 0)
            this.posicion.dividirEntre(this.pasajeros.size); //OJO ACA 1 del represent
        return this.posicion;
    }

    compararRepresentante(m2) {
        return (this.getID() === m2.getID() && this.getNombre() === m2.getNombre()
            && this.getPosicion().compararPosicion(m2.getPosicion())
            && this.getCantidad() === m2.getCantidad());
    }
    compararRepresentanteRaw(m2Raw) {
        return (this.getID() === m2Raw.id && this.getNombre() === m2Raw.nombre
            && this.getPosicion().compararPosicionRaw(m2Raw.posicion)
            && this.getCantidad() === m2Raw.cantidad);
    }

    agregarAPasajeros(pasajero) {
        this.sacarPasajero(pasajero); // saco a la persona
        this.pasajeros.set(pasajero.getID(), pasajero); //agrego updateada
    }

    getCantidad() {
        return this.pasajeros.size;
    }
}
module.exports = {
    Representante
}