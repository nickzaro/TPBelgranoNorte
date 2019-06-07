const { Posicion } = require('./../server/classes/Modelo/primitivos/Posicion');
const expect = require('chai').expect;

describe('Test para la Clase Posicion', () => {
    it('funcion multiplicarPor', () => {
        let posicion = new Posicion([1.0,5.0]);
        posicion.multiplicarPor(10);
        expect(posicion.lat).to.equal(10.0);
        expect(posicion.lng).to.equal(50.0);
    }
    )
    it('funcion dividirEntre', () => {
        let posicion = new Posicion([10.0, 50.0]);
        posicion.dividirEntre(10);
        expect(posicion.lat).to.equal(1.0);
        expect(posicion.lng).to.equal(5.0);
    }
    )
    it('funcion sumarPosicion', () => {
        let posicion = new Posicion([1.0, 5.0]);
        let pos2 = new Posicion([3, 4])
        posicion.sumarPosicion(pos2);
        expect(posicion.lat).to.equal(4.0);
        expect(posicion.lng).to.equal(9.0);
    }
    )
    it('funcion restarPosicion', () => {
        let posicion = new Posicion([1.0, 5.0]);
        let pos2 = new Posicion([3, 4])
        posicion.restarPosicion(pos2);
        expect(posicion.lat).to.equal(-2.0);
        expect(posicion.lng).to.equal(1.0);
    }
    )
    it('funcion empaquetarParaEnviar', () => {
        let posicion = new Posicion([1.0, 5.0]);
        
        let paquete = posicion.empaquetarParaEnviar();
        expect(paquete[0]).to.equal(1.0);
        expect(paquete[1]).to.equal(5.0);
    }
    )
    it('funcion compararPosicion', () => {
        let posicion = new Posicion([1.0, 5.0]);
        let posicion2 = new Posicion([1.0, 5.0]);
        expect(posicion.compararPosicion(posicion2)).to.true;
    }
    )
    it('funcion compararPosicionRaw', () => {
        let posRaw = [1.0, 5.0];
        let posicion = new Posicion([1.0, 5.0]);
        expect(posicion.compararPosicionRaw(posRaw)).to.true;
    }
    )
    
})
