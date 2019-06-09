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

var MAX_DISTANCIA = 0.05; // 50 metros, chequear

var dondeEsta = {
    ESTACION: 0,
    VIAJE: 1,
    FUERA: 2,
    DESCONICIDO:10
}

function buscarEstacionCerca(pasajero, estaciones) {
    let idDistancia = [-1,1000000];
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



module.exports = {
    distanciaLatLngEnKMRaw, MAX_DISTANCIA, dondeEsta, buscarEstacionCerca
}
