const { RepresentaPasajeros } = require('./../server/classes/pasajeros');
const { Posicion } = require('./../server/classes/movil');
const expect = require('chai').expect;

describe('Test para la Clase RepresentaPasajeros', () => {
    it('funcion empaquetarParaEnviar', () => {
        let reprePasa = new RepresentaPasajeros('01', 'coche-01');
        expect(reprePasa.compararPaquetes({
            id: '01',
            nombre: 'coche-01',
            posicion: { "lat": 0.0, "lng": 0.0 },
            cantidad: 0
        }) ===true );        
    })
})