
const lvi = require('./../Modelo/primitivos/datos/lu-vie-ida.json');
const lvv = require('./../Modelo/primitivos/datos/lu-vie-vuelta.json');
const shi = require('./../Modelo/primitivos/datos/sab-habiles-ida.json');
const shv = require('./../Modelo/primitivos/datos/sab-habiles-vuelta.json');
const dfi = require('./../Modelo/primitivos/datos/dom-feriados-ida.json');
const dfv = require('./../Modelo/primitivos/datos/dom-feriados-vuelta.json');
const estaciones = require('./../Modelo/primitivos/datos/estaciones.json');
const { CargadorViaje } = require('./cargadorViaje');

class ManejadorViajes {
    constructor() {
        this.cargarEstaciones();
        this.cargarViajes();
    }
    cargarEstaciones() {
        this.estaciones = new Map();
        for (let estacion of estaciones) {
            this.estaciones.set(estacion.id, estacion);
        }
        console.log(this.estaciones);
    }
    
    cargarViajes() {
        this.viajesLVI = new CargadorViaje(lvi, this.estaciones, "ida");
        this.viajesLVV = new CargadorViaje(lvv, this.estaciones, "vuelta");
        this.viajesSHI = new CargadorViaje(shi, this.estaciones, "ida");
        this.viajesSHV = new CargadorViaje(shv, this.estaciones, "vuelta");
        this.viajesDFI = new CargadorViaje(dfi, this.estaciones, "ida");
        this.viajesDFV = new CargadorViaje(dfv, this.estaciones, "vuelta");
    }
    
    procesarPeticion(pasajero) {
        console.log("realizar validaciones");
        console.log("armar viaje");
        console.log("agregar el viajero para ser representado ");
        return pasajero;
    }
    
    getEstaciones(){
        return this.estaciones;
    }

    getEstacionesRaw(){
        let estaciones = [];
        for (let [clave,valor] of this.estaciones){
            estaciones.push(valor);
        }
        return estaciones;
    }
}

module.exports = {
    ManejadorViajes
}