const { distanciaLatLngEnKMRaw, buscarEstacionCerca, horaADecimal, decimalAHora,
    distanciaporRangoEnCamino,crearPuntosRecorrido } = require('./../server/utilidades/utilidades');
const { ManejadorViajes } = require('./../server/classes/Controlador/manejador.viajes');
const turf = require('@turf/turf');
const expect = require('chai').expect;
describe('Test para la Utilidades', () => {
    it('funcion distanciaLatLngEnKMRaw', () => {
        let latlng1 = [
            -58.375253677368164,
            -34.59271833069185
        ];
        let latlng2 = [
            -58.37388575077057,
            -34.59097839481091
        ];
        let dis = distanciaLatLngEnKMRaw(latlng1, latlng2);
        console.log(dis);
        dis = distanciaLatLngEnKMRaw(latlng2, latlng1);
        console.log(dis);
        //expect(rep.compararRepresentante(rep2)).to.true;
    }
    )
    it('funcion buscarEstacionCerca', () => {
        let manejador = new ManejadorViajes();
        let pasajeroRetiro = {
            'id': 0,
            'nombre': "Pasajero",
            'posicion': [ //retiro
                -34.591264,
                -58.372742
            ]
        }

        let idDistancia = buscarEstacionCerca(pasajeroRetiro, manejador.getEstaciones());

        console.log(idDistancia);
        expect(idDistancia[0] === 0).to.true;
        let pasajeroGB = {
            'id': 0,
            'nombre': "Pasajero",
            'posicion': [ // GB
                -34.484404,
                -58.726209
            ]
        }

        idDistancia = buscarEstacionCerca(pasajeroGB, manejador.getEstaciones());
        console.log(idDistancia);
        expect(idDistancia[0] === 15).to.true;
        //expect(rep.compararRepresentante(rep2)).to.true;
    }
    )

    it('Funciones horaADecimal y decimalAHora', () => {
        let hora = "18:40";
        let horaD = horaADecimal(hora);
        console.log(horaD);
        let hora2 = decimalAHora(horaD);
        console.log(hora2);
        expect(hora === hora2).to.true;
    }
    )
})