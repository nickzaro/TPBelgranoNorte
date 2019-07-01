const { ManejadorHorarios } = require('./../server/classes/Controlador/manejadorHorarios');
const { ManejadorViajes } = require('./../server/classes/Controlador/manejador.viajes');
const fs = require('fs');
const expect = require('chai').expect;

describe('Test para Caso de Prueba 2', () => {

    var dondeEsta = {
        ESTACION: 0,
        VIAJE: 1,
        FUERA: 2,
        DESCONICIDO: 10
    }
    
    var distancias = {
        ESTACION: 0.050,  //50 metros de la estacion
        VIAJE: 0.010  // 20 metros del punto tren
    }

    // casos
    
    let enViaje = {
        id: 20,
        nombre: "pasajero entre saldias-Retiro",
        posicion: [-34.5834132246055, -58.38547825813293]
    }
    
    it("2 - Cliente esta en viaje", () => {
        let pasajeroViaje ={
            pasajero: enViaje, // envio la posicion del cliente
            destinoID: 10 // envio el id de la estacion de destino
        }
        let manejador = new ManejadorViajes();
        let res=manejador.construirViaje(pasajeroViaje);
        console.log(res);
        //console.log(res.tren);
        
    })
})
