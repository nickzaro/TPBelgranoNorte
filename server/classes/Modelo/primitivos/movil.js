
class Movil {
    constructor(id, nombre, posicion) {
        this.id = id;
        this.nombre = nombre;
        this.posicion = posicion;
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
    empaquetarParaEnviar(){
        return {
            'id': this.id,
            'nombre': this.nombre,
            'posicion': this.posicion.empaquetarParaEnviar()

        };
    }

}

module.exports = {
    Movil
}