const { Posicion } = require('./../classes/Modelo/primitivos/Posicion');
const  turf = require('@turf/turf');

//definicion de las estructuras que se maneja

//posicion
let posicionRaw = [0, 0];


// movil,pasajero,tren
let movilRaw = {
    'id': 0,
    'nombre': "nombre",
    'posicion': [0, 0]
}

// representante
let representanteRaw = {
    id: 0,
    nombre: "nombre",
    posicion: [0, 0],
    cantidad: 0
}

//estacion
let estacion = {
    "id": 1,
    "nombre": "Saldías",
    "ubicacion": [
        -34.575614,
        -58.399424
    ]
}

let PasajeroDestino = { // ingresa sus datos + a donde se dirije
    movilRaw,
    destino: 0
}

let lambdaDistancia = 0.0005  //es la distancia aprox a 100metros


function distanciaLatLngEnKMRaw(latlng1, latlng2) {
    return distanciaLatLngEnKM(latlng1[0], latlng1[1], latlng2[0], latlng2[1]);
}
function distanciaLatLngEnKM(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}



var dondeEsta = {
    ESTACION: 0,
    VIAJE: 1,
    FUERA: 2,
    DESCONICIDO: 10
}
var distancias = {
    ESTACION: 0.05,  //50 metros de la estacion
    VIAJE: 0.01  // 10 metros del punto tren
}


function buscarEstacionCerca(pasajero, estaciones) {
    let idDistancia = [-1, 1000000]; // idestacion, distancia
    let distancia = 0;
    for (let [clave, estacion] of estaciones) {
        distancia = distanciaLatLngEnKMRaw(pasajero.posicion, estacion.ubicacion);
        if (idDistancia[1] > distancia) {
            idDistancia[1] = distancia;
            idDistancia[0] = estacion.id;
        }

    }
    return idDistancia;
}

// si el pEvaluar se encuentra entre los dos puntos con un ancho de VIAJE=+-0.02
function distanciaporRangoEnCamino(pInicial, pFinal, pEvaluar) {
    let pEval = turf.point(pEvaluar);
    let line = turf.lineString([pInicial, pFinal]);
    return turf.pointToLineDistance(pEval, line);
}
//--------------------------------------------------------------

function verSiEstaEnViaje(pasajero, estaciones, idCercana) {
    let idMenos1 = idCercana - 1;
    let idMas1 = idCercana + 1;
    let estacion = estaciones.get(idCercana);
    let idOtraEstacion = -1;
    if (estaciones.has(idMenos1)) {
        let estMenos1 = estaciones.get(idMenos1);
        console.log(estMenos1.ubicacion, estacion.ubicacion, pasajero.posicion);
        let distMenos1 = distanciaporRangoEnCamino(estMenos1.ubicacion, estacion.ubicacion, pasajero.posicion);
        if (distMenos1 <= distancias.VIAJE) { // estaria en viaje
            idOtraEstacion = estMenos1;
            return [idOtraEstacion, idCercana, pasajero];
        }
    }
    if (estaciones.has(idMas1)) {
        let estMas1 = estaciones.get(idMas1);
        let distMas1 = distanciaporRangoEnCamino(estMas1.ubicacion, estacion.ubicacion, pasajero.posicion);
        if (distMas1 <= distancias.VIAJE) { // estaria en viaje
            idOtraEstacion = estMas1;
            return [idOtraEstacion, idCercana, pasajero];
        }
    }
    return [idOtraEstacion];
}



//parser "18:40" => 18*60+40 = 1120 ovbia los segundos
function horaADecimal(hora) {
    let enVectordecimal = hora.split(":");
    console.log(enVectordecimal);
    return (parseInt(enVectordecimal[0]) * 60 + parseInt(enVectordecimal[1]));
}
// 1120 => "18:40"
function decimalAHora(horaDecimal) {
    let horas = Math.trunc(horaDecimal / 60);
    let min = horaDecimal % 60;
    return String(horas + ":" + min);
}
//-----------------------------------------------------



module.exports = {
    distanciaLatLngEnKMRaw, dondeEsta, buscarEstacionCerca,
    horaADecimal, decimalAHora, distancias, distanciaporRangoEnCamino,
    verSiEstaEnViaje
}
