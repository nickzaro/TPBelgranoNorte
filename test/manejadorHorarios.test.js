const { ManejadorHorarios } = require('./../server/classes/Controlador/manejadorHorarios');
const { ManejadorViajes } = require('./../server/classes/Controlador/manejador.viajes');
const expect = require('chai').expect;

describe('Test para ManejadorHorarios', () => {

    /*
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
        let horaF = "23:50";
        expect(ManejadorHorarios.estaEnElRango(fechaActual,horaI, horaF)).to.true; // este no va dar a menos que marques la hora correcta

    })
    it("funcion esElHorario ",()=>{
        
        console.log("FECHA ACTUAL:",ManejadorHorarios.horaActualUTC());
        let vec =["19:00","19:05","19:11","19:16","19:20","19:23","19:27","19:32","19:38","19:45","19:49","19:53","19:56","20:00","20:03","20:07"];
        let unMapHorario = new Map();
        for(let i = 0; i<vec.length;i++){
            unMapHorario.set(i,vec[i]);
        }
       // console.log("El Mapa: ", unMapHorario);
        let idOrigen = 15;
        let idDestino = 15;

        expect(ManejadorHorarios.esElHorario(ManejadorHorarios.horaActualUTC(),idOrigen,idDestino,unMapHorario)).to.true;
    })

    
    it("funcion buscarEnElDia",()=>{
        let manejador = new ManejadorViajes();
        let idOrigen = 15;
        let idDestino = 15;
        ManejadorHorarios.buscarEnElDia(ManejadorHorarios.horaActualUTC(), idOrigen, idDestino, manejador.viajesSHI.recorridos); 
    })
*/
    /*
        it("funcion stringHorasADate",()=>{
            let manejador = new ManejadorViajes();
            
            ManejadorHorarios.stringHorasADate(manejador.viajesSHI.recorridos.get(79)); 
        })
    */

    /*
          it("funcion tiempoSegunID",()=>{
              let manejador = new ManejadorViajes();
              let idOrigen = 1;
              let idDestino = 10;
              ManejadorHorarios.tiempoSegunID(idOrigen,idDestino,manejador.viajesSHI.recorridos.get(79)); 
          })
    */

    it("funcion menorTiempoLLegaEstacion", () => {
        let manejador = new ManejadorViajes();
        let idOrigen = 6;
        let idDestino = 20;
        ManejadorHorarios.menorTiempoLlegaEstacion(idOrigen, idDestino, manejador.viajesSHI.recorridos);
    })

})
