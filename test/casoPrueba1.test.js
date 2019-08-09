const { ManejadorHorarios } = require('./../server/classes/Controlador/manejadorHorarios');
const { ManejadorViajes } = require('./../server/classes/Controlador/manejador.viajes');
const fs = require('fs');
const expect = require('chai').expect;

describe('Test para Caso de Prueba 1', () => {

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
    let enFuera = {
        id: 1,
        nombre: "pasajero-Lejos",
        posicion: [-34.577614, -58.396424] //estacion mas cercana saldias
    }
    
    let enViaje = {
        id: 1,
        nombre: "pasajero-saldias-Retiro",
        posicion: [-34.5834132246055, -58.38547825813293]
    }
    
    let enEstacion = {
        id: 0,
        nombre: "pasajero-en-retiro",
        posicion: [-34.5901393264139, -58.37371945381165]
    }

    


    it("1.1 - Cliente Lejos de cualquier estacion y vias del tren", () => {
        let pasajeroFuera ={
            pasajero: enFuera, // envio la posicion del cliente
            destinoID: 10 // envio el id de la estacion de destino
        }
        ManejadorHorarios.modHoraActual("2019-07-01T20:20:00.100Z");
        let manejador = new ManejadorViajes();
        let res=manejador.construirViaje(pasajeroFuera);
        console.log(res);
       // console.log(res.tren);
        
    })
    

    
    it("1.2 - Cliente esta en la estacion", () => {
        let pasajeroEstacion ={
            pasajero: enEstacion, // envio la posicion del cliente
            destinoID: 10 // envio el id de la estacion de destino
        }
        ManejadorHorarios.modHoraActual("2019-07-01T20:20:00.100Z");
        let manejador = new ManejadorViajes();
        let res=manejador.construirViaje(pasajeroEstacion);
        console.log(res);
        //console.log(res.tren);
        
    })
})
