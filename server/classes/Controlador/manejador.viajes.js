
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
const DIASENTIDO = {
    LVI: 0,
    LVV: 1,
    SHI: 2,
    SHV: 3,
    DFI: 4,
    DFV: 5,
    NOEXISTE: -1
}
class ManejadorViajes {
    constructor() {
        this.grilla = new Map(); // guarda la grilla de viajes publicada
        this.cargarEstaciones();
        this.cargarViajes();
    }

    // carga las estaciones que existen
    cargarEstaciones() {
        this.estaciones = new Map();
        for (let estacion of estaciones) {
            this.estaciones.set(estacion.id, estacion);
        }
    }

    // carga los viajes 
    cargarViajes() {
        // console.log(this.viajesLVI);
        this.grilla.set(DIASENTIDO.LVI, new CargadorViaje(lvi, this.estaciones, "ida"));
        this.grilla.set(DIASENTIDO.LVV, new CargadorViaje(lvv, this.estaciones, "vuelta"));
        this.grilla.set(DIASENTIDO.SHI, new CargadorViaje(shi, this.estaciones, "ida"));
        this.grilla.set(DIASENTIDO.SHV, new CargadorViaje(shv, this.estaciones, "vuelta"));
        this.grilla.set(DIASENTIDO.DFI, new CargadorViaje(dfi, this.estaciones, "ida"));
        this.grilla.set(DIASENTIDO.DFV, new CargadorViaje(dfv, this.estaciones, "vuelta"));

    }

    // recibe informacion del pasajero, calcula el escenario y llama de acuerdo a esto
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

    // Calcula en que situacion se haya el pasajero:FUERA,ESTACION o viaje.
    siatuacionPasajero(pasajeroDestino) {
        let [id, distancia] = buscarEstacionCerca(pasajeroDestino.pasajero, this.getEstaciones());
        let estaEnviaje = verSiEstaEnViaje(pasajeroDestino.pasajero, this.getEstaciones(), id);
        if (distancia < distancias.ESTACION) {
            return dondeEsta.ESTACION;
        }
        if ((estaEnviaje[0] != -1) && (distancia > distancias.ESTACION)) {
            return dondeEsta.VIAJE; // su esta viajando
        }
        if (distancia > distancias.ESTACION) {
            return dondeEsta.FUERA; // para usar solo el camino FUERA
        }

        return dondeEsta.DESCONICIDO; // si algo fallo con los calculos
    }

    actualizarUbicacionViaje() {

    }

    //buscar la estacion mas proxima a la persona
    recomendarEstacion(pasajeroDestino, escenario) {
        let [id, distancia] = buscarEstacionCerca(pasajeroDestino.pasajero, this.getEstaciones());
        let res = this.buscarHorario(id, pasajeroDestino.destinoID);
        
        let respuesta = {
            escenario: escenario,
            estacion: this.getEstaciones().get(id),
            origen: res.origen,
            distancia: distancia,
            destino: res.destino,
            idViaje: res.idViaje,
            recorrido: res.recorrido,
            horaActual: res.horaActual,
            tiempoArribo: res.tiempoArribo
        }
        
        return respuesta;
        
        /*{
            escenario: escenario,
            estacion: this.getEstaciones().get(id),
            distancia: distancia,
            tren: res
        }*/
    }
    // busca el horario de llegada mas proximo a idOrigen segun el horario
    buscarHorario(idOrigen, idDestino) {
        let fecha = ManejadorHorarios.horaActualUTC();
        let dia = fecha.getDay();
        let res = ["ERROR", "ERROR"];
        //console.log( this.grilla.get(this.decidirDiaFecha(idOrigen, idDestino)));
        res = this.buscarHorariosXRango(idOrigen, idDestino, this.grilla.get(this.decidirDiaFecha(idOrigen, idDestino)));
        if (idOrigen === idDestino) {
            console.log("ESTA EN LA ESTACION ORIGEN = DESTINO");
            res = [fecha.getHours(), fecha.getHours()];
        }
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

    decidirDiaFecha(idOrigen, idDestino) {
        let fecha = ManejadorHorarios.horaActualUTC();
        let dia = fecha.getDay();
        let res = -1;

        // si es la misma estacion recomendar de IDA o VUELTA, elijo ida
        if (idOrigen <= idDestino) {
            if (dia > 0 && dia < 6) { //dia de la semana e ida
                res = DIASENTIDO.LVI;
            }
            else if (dia === 6) { //sabado e ida
                res = DIASENTIDO.SHI;
            }
            else if (dia === 0) { //domingo e ida
                res = DIASENTIDO.DFI;
            }
            else {
                //NOEXISTE EL DIA
                console.error("NO EXISTE EL DIA: ", dia);
              //  res = DIASENTIDO.NOEXISTE;
            }
        }
        else if (idOrigen > idDestino) {
            if (dia > 0 && dia < 6) { //dia de la semana y vuelta
                res = DIASENTIDO.LVV;
            }
            if (dia === 6) { //sabado y vuelta
                res = DIASENTIDO.SHV;
            }
            if (dia === 0) { //domingo y vuelta
                res = DIASENTIDO.DFV;
            } else {
                //NOEXISTE EL DIA
                console.error("NO EXISTE EL DIA: ", dia);
               // res = DIASENTIDO.NOEXISTE;
            }
        }
        return res;
    }

    // Si el pasajero salio de la estacion, saber en que horario se encuentra
    buscarHorarioMayor(idOrigen, idDestino) {
        let fecha = ManejadorHorarios.horaActualUTC();
        let dia = fecha.getDay();
        let res = ["ERROR", "ERROR"];

        res = this.buscarHorariosXRangoMayor(idOrigen, idDestino, this.grilla.get(this.decidirDiaFecha(idOrigen, idDestino)));
        if (idOrigen === idDestino) {
            console.log("ESTA EN LA ESTACION ORIGEN = DESTINO");
            res = [fecha.getHours(), fecha.getHours()];
        }
        return res;
    }
    buscarHorariosXRangoMayor(idOrigen, idDestino, viajes) {
        let res = ManejadorHorarios.menorTiempoSalidaEstacion(idOrigen, idDestino, viajes.getRecorridos());
        let recorrido = this.construirEstacionesSinNombresConHorarios(res.idViaje, viajes.getRecorridos());
        // console.log("RECORRRIDOS:", res);
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

    // cuando el pasajero esta en VIAJE
    crearViaje(pasajeroDestino, escenario) {
        let id = buscarEstacionDondeSalio(pasajeroDestino, this.getEstaciones());

        //id es donde salio el cliente
        let posicionActual = pasajeroDestino.pasajero.posicion;
        let res = this.buscarHorarioMayor(id, pasajeroDestino.destinoID);

        let d1 = -1, d2 = -1;
        let idSiguiente = -1;
        if (res.origen < res.destino) { // viaje de ida
            idSiguiente = res.origen + 1;

            // ESTO DA ERROR CUANDO NO FUNCIONA EL TREN PUES NO HAY UN HORARIO MENOR A LA HORA ACTUAL; ES DECIR NO PUEDE ESTAR EN VIAJE
            d2 = distanciaLatLngEnKMRaw(this.getEstaciones().get(res.origen).ubicacion, this.getEstaciones().get(res.origen + 1).ubicacion);
            d1 = distanciaLatLngEnKMRaw(posicionActual, this.getEstaciones().get(res.origen + 1).ubicacion);
           // console.log("Distancia1IDA: ", d1);
           // console.log("Distancia2IDA: ", d2);
        } else if (res.origen > res.destino) { // viaje de vuelta
            idSiguiente = res.origen - 1;
            d2 = distanciaLatLngEnKMRaw(this.getEstaciones().get(res.origen).ubicacion, this.getEstaciones().get(res.origen - 1).ubicacion);
            d1 = distanciaLatLngEnKMRaw(posicionActual, this.getEstaciones().get(res.origen - 1).ubicacion);
           // console.log("Distancia1VUELTA: ", d1);
           // console.log("Distancia2VUELTA: ", d2);

        } else { // en el caso de igualdad no se hace nada
            // se podria retornar, aviso de no cambio, porque esta en una estacion
        }

        // ESTA bien si da error cuando no funciona ningun tren pues la hora actual asume que salio algun tren
        // SI ASI QUE VER ESTO DE  TIRAR ALGUN ERROR Y LISTO
        let horaOrigen = ManejadorHorarios.horaUTCdeString(res.recorrido.get(res.origen));
        let horaSiguiente = ManejadorHorarios.horaUTCdeString(res.recorrido.get(idSiguiente));
        let horaActual = ManejadorHorarios.horaActualUTC();

       console.log("HORA ACTUAL:", horaActual, " HORA ORIGEN:", horaOrigen, " HORA SIGUIENTE: ", horaSiguiente);
        let horallegadaEstacion = new Date(ManejadorHorarios.horaActualUTC()); // para copiar Horas
        //horallegadaEstacion.setUTCHours(ManejadorHorarios.horaActualUTC().getHours());
        let restah = Math.trunc((horaSiguiente - horaOrigen) * d1 / d2);
        // console.log(restah);
        //horallegadaEstacion.setUTCHours(horallegadaEstacion.getHours());
        horallegadaEstacion.setMilliseconds(horaActual.getMilliseconds()+restah);
        
        // let hora = horaActual + Math.trunc((horaSiguiente - horaOrigen) * d1 / d2);
        // horallegadaEstacion.setUTCDate(horallegadaEstacion.getDate());
        console.log("HORA LLEGADA ESTACION ", idSiguiente, "  :", horallegadaEstacion);
        let resultado = {
            origen:res.origen,
            destino: res.destino,
            idViaje:res.idViaje,
            recorrido:res.recorrido,
            horaActual:`${horaActual.getUTCHours()}:${horaActual.getUTCMinutes()}`,
            horaLLega:`${horallegadaEstacion.getUTCHours()}:${horallegadaEstacion.getUTCMinutes()}`,
            horaDeberia:`${horaSiguiente.getUTCHours()}:${horaSiguiente.getUTCMinutes()}`,
            retraso: `${Math.trunc((horallegadaEstacion.getHours()-horaSiguiente.getHours())/3600)}hs ${Math.trunc(horallegadaEstacion.getMinutes()-horaSiguiente.getMinutes())}min`
        }
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

        //ESTO ES LA RESPUESTA PARA EL CLIENTE, FORMEAR PARA ENTREGAR SOLO LO NECESARIO
        return resultado;
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