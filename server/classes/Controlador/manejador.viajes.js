
const lvi = require('./../Modelo/primitivos/datos/lu-vie-ida.json');
const lvv = require('./../Modelo/primitivos/datos/lu-vie-vuelta.json');
const shi = require('./../Modelo/primitivos/datos/sab-habiles-ida.json');
const shv = require('./../Modelo/primitivos/datos/sab-habiles-vuelta.json');
const dfi = require('./../Modelo/primitivos/datos/dom-feriados-ida.json');
const dfv = require('./../Modelo/primitivos/datos/dom-feriados-vuelta.json');
const estaciones = require('./../Modelo/primitivos/datos/estaciones.json');
const { distanciaLatLngEnKMRaw, MAX_DISTANCIA, dondeEsta, buscarEstacionCerca,
    verSiEstaEnViaje, distancias, buscarEstacionDondeSalio } = require('./../../utilidades/utilidades');
const { CargadorViaje } = require('./cargadorViaje');
const { ManejadorHorarios } = require('./manejadorHorarios');
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
            return this.recomendarEstacion(pasajeroDestino, esenario);
        }
        if (esenario === dondeEsta.ESTACION) {
            return this.avisarArriboTren(pasajeroDestino, esenario);
        }
        if (esenario === dondeEsta.VIAJE) {
            return this.crearViaje(pasajeroDestino, esenario); //armar el viaje
        }

    }
    // necesario cuando el viaje este en curso creado y andando osea el ciclo comun

    siatuacionPasajero(pasajeroDestino) {
        let [id, distancia] = buscarEstacionCerca(pasajeroDestino.pasajero, this.getEstaciones());
        let estaEnviaje = verSiEstaEnViaje(pasajeroDestino.pasajero, this.getEstaciones(), id);
       // console.log("estaEnviaje: ", estaEnviaje, " fin");
       // console.log("pasajero: ", pasajeroDestino, " finPasajero");
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
    recomendarEstacion(pasajeroDestino, escenario) {
        //console.log(pasajeroDestino);
        let [id, distancia] = buscarEstacionCerca(pasajeroDestino.pasajero, this.getEstaciones());
        //console.log('HORAA:',new Date());
       // console.log(id, pasajeroDestino.destinoID);
        let res = this.buscarHorario(id, pasajeroDestino.destinoID);

        return {
            escenario: escenario,
            estacion: this.getEstaciones().get(id),
            distancia: distancia,
            tren: res
        }
    }
    // el destino lo necesito para saber para donde se dirige
    buscarHorario(idOrigen, idDestino) {
        let fecha = ManejadorHorarios.horaActualUTC();
        let dia = fecha.getDay();
        let res = ["ERROR", "ERROR"];
        if (idOrigen < idDestino) {
            if (dia > 0 && dia < 6) { //dia de la semana e ida
                res = this.buscarHorariosXRango(idOrigen, idDestino, this.viajesLVI);
            }
            else if (dia === 6) { //sabado e ida
                res = this.buscarHorariosXRango(idOrigen, idDestino, this.viajesSHI);
            }
            else if (dia === 0) { //domingo e ida
                res = this.buscarHorariosXRango(idOrigen, idDestino, this.viajesDFI);
            }
            else {
                //NOEXISTE EL DIA
                console.error("NO EXISTE EL DIA: ", dia);
            }
        }
        else if (idOrigen > idDestino) {
            if (dia > 0 && dia < 6) { //dia de la semana y vuelta
                res = this.buscarHorariosXRango(idOrigen, idDestino, this.viajesLVV);
            }
            if (dia === 6) { //sabado y ida
                res = this.buscarHorariosXRango(idOrigen, idDestino, this.viajesSHV);
            }
            if (dia === 0) { //domingo y ida
                res = this.buscarHorariosXRango(idOrigen, idDestino, this.viajesDFV);
            } else {
                //NOEXISTE EL DIA
                console.error("NO EXISTE EL DIA: ", dia);
            }
        }
        else if (idOrigen === idDestino) {
            console.log("ESTA EN LA ESTACION ORIGEN = DESTINO");
            res = [fecha.getHours(), fecha.getHours()];
        }
        // console.log("TERMINO DE BUSCAR", res);
        // console.log(dia, fecha, idOrigen, idDestino);
        return res;
    }

    buscarHorariosXRango(idOrigen, idDestino, viajes) {
        let res = ManejadorHorarios.menorTiempoLlegaEstacion(idOrigen, idDestino, viajes.getRecorridos());
        let recorrido = this.construirEstacionesSinNombresConHorarios(res.idViaje, viajes.getRecorridos());
        return {
            origen: res.idOrigen,
            destino: res.idDestino,
            idViaje: res.idViaje,
            recorrido: recorrido,
            horaActual: `${res.horaActual.getUTCHours()}:${res.horaActual.getUTCMinutes()}`,
            tiempoArribo: `${Math.trunc(res.tiempoMinimo / 3600)}hs ${Math.trunc((res.tiempoMinimo % 3600) / 60)}min`

        };
    }
    //hace lo mismo que recomendarEstacion, porque el pasajero
    //necesita la misma informacion
    avisarArriboTren(pasajeroDestino, escenario) {
        return this.recomendarEstacion(pasajeroDestino, escenario);
    }

    crearViaje(pasajeroDestino, escenario) { // aca se arma el viaje para el pasajero
        let id = buscarEstacionDondeSalio(pasajeroDestino, this.getEstaciones());
        //let [id, distancia] = buscarEstacionCerca(pasajeroDestino.pasajero, this.getEstaciones());

        // ahora si id es el id de donde salio el cliente y el res tira valores validos.
        let posicionActual = pasajeroDestino.pasajero.posicion;
        let res = this.buscarHorario(id, pasajeroDestino.destinoID);

        //DEBERIA SER ASI,BUSCAR PORQUE
        //res.idViaje = res.idViaje;
        //res.recorrido = this.construirEstacionesSinNombresConHorarios(res.idViaje, this.viajesLVI.getRecorridos());
        // TERMINA 


        let d1 = -1, d2 = -1;
        let idSiguiente = -1;
        if (res.origen < res.destino) { // viaje de ida
            idSiguiente = res.origen + 1;
            d2 = distanciaLatLngEnKMRaw(this.getEstaciones().get(res.origen).ubicacion, this.getEstaciones().get(res.origen + 1).ubicacion);
            d1 = distanciaLatLngEnKMRaw(posicionActual, this.getEstaciones().get(res.origen + 1).ubicacion);
            console.log("Distancia1IDA: ", d1);
            console.log("Distancia2IDA: ", d2);
        } else if (res.origen > res.destino) { // viaje de vuelta
            idSiguiente = res.origen - 1;
            d2 = distanciaLatLngEnKMRaw(this.getEstaciones().get(res.origen).ubicacion, this.getEstaciones().get(res.origen - 1).ubicacion);
            d1 = distanciaLatLngEnKMRaw(posicionActual, this.getEstaciones().get(res.origen - 1).ubicacion);
            console.log("Distancia1VUELTA: ", d1);
            console.log("Distancia2VUELTA: ", d2);

        } else { // en el caso de igualdad no se hace nada
            // se podria retornar, aviso de no cambio, porque esta en una estacion
        }
        let horaOrigen = ManejadorHorarios.horaUTCdeString(res.recorrido.get(res.origen));
        let horaSiguiente = ManejadorHorarios.horaUTCdeString(res.recorrido.get(idSiguiente));
        let horaActual = ManejadorHorarios.horaActualUTC();

        console.log("HORA ACTUAL:", horaActual, " HORA ORIGEN:", horaOrigen, " HORA SIGUIENTE: ", horaSiguiente);
        let horallegadaEstacion = new Date();
        let restah = Math.trunc((horaSiguiente - horaOrigen) * d1 / d2);
        console.log(restah);
        horallegadaEstacion.setMilliseconds(horaActual.getMilliseconds() + restah);
        horallegadaEstacion.setUTCHours(horallegadaEstacion.getHours());
        let hora = horaActual + Math.trunc((horaSiguiente - horaOrigen) * d1 / d2);
        //horallegadaEstacion.setUTCDate(horallegadaEstacion);
        console.log("HORA LLEGADA ESTACION ", idSiguiente, "  :", horallegadaEstacion);

        /*
        { res tiene todo esto
            origen:res.idOrigen,
            destino:res.idDestino,
            idViaje:res.idViaje,
            recorrido: recorrido,
            horaActual:`${res.horaActual.getUTCHours()}:${res.horaActual.getUTCMinutes()}`,
            tiempoArribo:`${Math.trunc(res.tiempoMinimo/3600)}hs ${Math.trunc((res.tiempoMinimo%3600)/60)}min`

        };
        */
        return res;
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
    //idViajeHorario: id del mapa de ViajesDia
    construirEstacionesNombresConHorarios(idViajeHorario, mapDeViajesDia) {
        let estacionesConHora = [];
        for (let [idEstacion, horaEstacion] of mapDeViajesDia.get(idViajeHorario)) {

            estacionesConHora.push([this.getEstaciones().get(idEstacion).nombre, horaEstacion]);
        }
        return estacionesConHora;
    }
    construirEstacionesSinNombresConHorarios(idViajeHorario, mapDeViajesDia) {

        return mapDeViajesDia.get(idViajeHorario);
    }
}

module.exports = {
    ManejadorViajes
}