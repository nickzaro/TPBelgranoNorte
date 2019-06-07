const { Movil, Posicion } = require('./../server/classes/movil');
const expect = require('chai').expect;

describe('Test para la Clase Posicion', () => {
    it('funcion multiplicarPor', () => {
        let posicion = new Posicion(1.0, 5.0);
        posicion.multiplicarPor(10);
        expect(posicion.lat).to.equal(10.0);
        expect(posicion.lng).to.equal(50.0);
    }
    )
    it('funcion dividirEntre', () => {
        let posicion = new Posicion(10.0, 50.0);
        posicion.dividirEntre(10);
        expect(posicion.lat).to.equal(1.0);
        expect(posicion.lng).to.equal(5.0);
    }
    )
    it('funcion sumarPosicion', () => {
        let posicion = new Posicion(1.0, 5.0);
        let pos2 = new Posicion(3, 4)
        posicion.sumarPosicion(pos2);
        expect(posicion.lat).to.equal(4.0);
        expect(posicion.lng).to.equal(9.0);
    }
    )
    it('funcion restarPosicion', () => {
        let posicion = new Posicion(1.0, 5.0);
        let pos2 = new Posicion(3, 4)
        posicion.restarPosicion(pos2);
        expect(posicion.lat).to.equal(-2.0);
        expect(posicion.lng).to.equal(1.0);
    }
    )

})