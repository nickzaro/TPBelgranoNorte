const {ManejadorHorarios} = require('./../server/classes/Controlador/manejadorHorarios');
const expect = require('chai').expect;

describe('Test para ManejadorHorarios', () => {

    it('funcion parsearHora', () => {
        let hora = "10:20";
        let h = "10";
        let m = "20";
        let horaParseada = ManejadorHorarios.parsearHora(hora);

        expect(horaParseada[0] === h && horaParseada[1] === m).to.true;
    })

    it("funcion estaEnElRango",()=>{
        let fechaActual = new Date();
        let horaI = "0:10";
        let horaF = "02:50";
        expect(ManejadorHorarios.estaEnElRango(fechaActual,horaI, horaF)).to.true; // este no va dar a menos que marques la hora correcta

    })

})
