const { Posicion } = require('./../server/classes/Modelo/primitivos/Posicion')
const { Movil } = require('./../server/classes/Modelo/primitivos/movil');
const expect = require('chai').expect;

describe('Test para la Clase Movil', () => {

    
    it('funcion empaquetarParaEnviar',()=>{
        let mov = {
            id: 1,
            nombre: "movil-1",
            posicion: [10, 20.2]
        }
        let m1 = new Movil(mov);
        let mov2 = m1.empaquetarParaEnviar();
        
    })
    it('funcion compararMovil', () => {
        let mov = {
            id: 1,
            nombre: "movil-1",
            posicion: [10, 20.2]
        }
        let m1 = new Movil(mov);
        let m2 = new Movil(mov);
        expect(m1.compararMovil(m2)).to.true;
    }
    )
    it('funcion compararMovilRaw', () => {
        let mov = {
            id: 1,
            nombre: "movil-1",
            posicion: [10, 20.2]
        }
        let m1 = new Movil(mov);
        expect(m1.compararMovilRaw(mov)).to.true;
    }
    )
})
