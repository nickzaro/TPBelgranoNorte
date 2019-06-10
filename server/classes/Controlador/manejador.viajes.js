
const lvi = require('./../Modelo/primitivos/datos/lu-vie-ida.json');
const lvv = require('./../Modelo/primitivos/datos/lu-vie-vuelta.json');
const shi = require('./../Modelo/primitivos/datos/sab-habiles-ida.json');
const shv = require('./../Modelo/primitivos/datos/sab-habiles-vuelta.json');
const dfi = require('./../Modelo/primitivos/datos/dom-feriados-ida.json');
const dfv = require('./../Modelo/primitivos/datos/dom-feriados-vuelta.json');
const estaciones = require('./../Modelo/primitivos/datos/estaciones.json');
const { distanciaLatLngEnKMRaw, MAX_DISTANCIA, dondeEsta, buscarEstacionCerca,
    verSiEstaEnViaje,distancias } = require('./../../utilidades/utilidades');
const { CargadorViaje } = require('./cargadorViaje');

class ManejadorViajes {
    constructor() {
        this.cargarEstaciones();
        this.cargarViajes();
        this.viajes = new Map(); //guarda los distintos viajes
    }
    cargarEstaciones() {
        this.estaciones = new Map();
        for (let estacion of estaciones) {
            this.estaciones.set(estacion.id, estacion);
        }
        //console.log(this.estaciones);
    }

    cargarViajes() {
        this.viajesLVI = new CargadorViaje(lvi, this.estaciones, "ida");
        this.viajesLVV = new CargadorViaje(lvv, this.estaciones, "vuelta");
        this.viajesSHI = new CargadorViaje(shi, this.estaciones, "ida");
        this.viajesSHV = new CargadorViaje(shv, this.estaciones, "vuelta");
        this.viajesDFI = new CargadorViaje(dfi, this.estaciones, "ida");
        this.viajesDFV = new CargadorViaje(dfv, this.estaciones, "vuelta");
        // console.log(this.viajesLVI);
    }

    procesarPeticion(pasajero) {
        console.log("realizar validaciones");
        console.log("armar viaje");
        console.log("agregar el viajero para ser representado ");
        return pasajero;
    }

    /* 
    esto debe devolver algo del estilo
    {
        dondeEsta, //para que sepa que hacer el front
        datos necesarios para renderizar el front
    }
    */
    construirViaje(pasajeroDestino) {
        let esenario = this.siatuacionPasajero(pasajeroDestino);
        if (esenario === dondeEsta.FUERA) {
            return this.recomendarEstacion(pasajeroDestino);
        }
        if (esenario === dondeEsta.ESTACION) {
            return this.avisarArriboTren(pasajeroDestino);
        }
        if (esenario === dondeEsta.VIAJE) {
            return this.crearViaje(pasajeroDestino); //armar el viaje
        }

    }
    // necesario cuando el viaje este en curso creado y andando osea el ciclo comun

    siatuacionPasajero(pasajeroDestino) {
        let [id, distancia] = buscarEstacionCerca(pasajeroDestino.pasajero, this.getEstaciones());
        let estaEnviaje = verSiEstaEnViaje(pasajeroDestino.pasajero, this.getEstaciones(), id);
        if (distancia < distancias.ESTACION) {
            return dondeEsta.ESTACION;
        }
        if ((estaEnviaje[0] != -1) && (distancia > distancias.ESTACION)) {
            return dondeEsta.VIAJE; //ACA se Arma el 
        }
        if (distancia > distancias.ESTACION) {
            return dondeEsta.FUERA; // para usar solo el camino FUERA
        }
        return dondeEsta.DESCONICIDO; // si algo fallo con los calculos
    }

    actualizarUbicacionViaje() {

    }

    //buscar la estacion mas proxima a la persona, aclaro que es doble busqueda
    recomendarEstacion(pasajeroDestino) {
        //console.log(pasajeroDestino);
        let [id, distancia] = buscarEstacionCerca(pasajeroDestino.pasajero, this.getEstaciones());

        return {
            escenario: dondeEsta.FUERA,
            estacion: this.getEstaciones().get(id),
            distancia: distancia
        }
    }
    avisarArriboTren(pasajeroDestino){
        console.log("Esta en la ESTACION :", pasajeroDestino);
    }

    crearViaje(pasajeroDestino){ // aca se arma el viaje para el pasajero
        console.log("Esta en VIAJE :", pasajeroDestino);
    }



    getEstaciones() {
        return this.estaciones;
    }

    getEstacionesRaw() {
        let estaciones = [];
        for (let [clave, valor] of this.estaciones) {
            estaciones.push(valor);
        }
        return estaciones;
    }
}

module.exports = {
    ManejadorViajes
}