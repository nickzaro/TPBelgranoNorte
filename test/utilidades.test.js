const { distanciaLatLngEnKMRaw } = require('./../server/utilidades/utilidades');

describe('Test para la Utilidades', () => {
    it('funcion distanciaLatLngEnKM', () => {
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
});