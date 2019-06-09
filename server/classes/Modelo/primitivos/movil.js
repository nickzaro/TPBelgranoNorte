const {Posicion} = require('./Posicion');
class Movil {
    constructor(movilRaw) {
        this.id = movilRaw.id;
        this.nombre = movilRaw.nombre;
        this.posicion = new Posicion(movilRaw.posicion);
    }
    getPosicion() {
        return this.posicion;
    }
    getID() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    //trasforma el movil a movilRaw para enviar
    empaquetarParaEnviar(){
        return {
            'id': this.id,
            'nombre': this.nombre,
            'posicion': this.posicion.empaquetarParaEnviar()

        };
    }
    compararMovil(m2){
        return (this.getID()==m2.getID() && this.getNombre()==m2.getNombre() 
        && this.getPosicion().compararPosicion(m2.getPosicion()));
    }
    compararMovilRaw(m2Raw){
        return (this.getID()==m2Raw.id && this.getNombre()==m2Raw.nombre 
        && this.getPosicion().compararPosicionRaw(m2Raw.posicion));
    }

}

module.exports = {
    Movil
}