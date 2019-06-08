const { Representante } = require('./../server/classes/Modelo/representante');
const {Pasajero} = require('./../server/classes/Modelo/pasajero');
const expect = require('chai').expect;

let mov0 = {
    id: 1,
    nombre: "movil-1",
    posicion: [0, 0]
}
let mov = {
    id: 1,
    nombre: "movil-1",
    posicion: [10, 20.2]
}

let repRaw0 = {
    id: 1,
    nombre: "movil-1",
    posicion: [0, 0],
    cantidad: 0
}

let repRaw = {
    id: 1,
    nombre: "movil-1",
    posicion: [10, 20.2],
    cantidad: 1
}
describe('Test para la Clase Representante', () => {
    it('funcion compararRepresentante', () => {
        let rep = new Representante(mov0);
        let rep2 = new Representante(mov0);
        expect(rep.compararRepresentante(rep2)).to.true;
    }
    )

    it('funcion compararRepresentanteRaw', () => {
        let rep = new Representante(mov0);
        //console.log(rep.empaquetarParaEnviar());
        //console.log(repRaw);
        expect(rep.compararRepresentanteRaw(repRaw0)).to.true;
    }
    )
    it('funcion sacarPasajero-agregarPasajero', () => {
        let rep = new Representante(mov0);
        let pas = new Pasajero(mov);
        //let repRaw = rep.empaquetarParaEnviar();
       //console.log("repRaw",repRaw);
        rep.sacarPasajero(pas);
        console.log("repEmpaquetado",rep.empaquetarParaEnviar());

        // no hay pasajeros
        expect(rep.compararRepresentanteRaw(repRaw0)).to.true;
        rep.agregarPasajero(pas);
        console.log("LUEGOAGREGAR",rep.empaquetarParaEnviar());
        console.log("LUEGOAGREGAR",repRaw);
        // se agrego un Pasajero
        expect(rep.compararRepresentanteRaw(repRaw)).to.true;
        rep.sacarPasajero(pas);
        console.log("repEmpaquetado",rep.empaquetarParaEnviar());

        // no hay pasajeros
        expect(rep.compararRepresentanteRaw(repRaw0)).to.true;
    }
    )

}
)
