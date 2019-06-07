class Posicion {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    multiplicarPor(numero) {
        this.lat *= numero;
        this.lng *= numero;
    }
    dividirEntre(numero) {
        if (numero != 0) {
            this.lat /= numero;
            this.lng /= numero;
        }
    }
    sumarPosicion(posicion) {
        this.lat += posicion.lat;
        this.lng += posicion.lng;
    }
    restarPosicion(posicion) {
        this.lat -= posicion.lat;
        this.lng -= posicion.lng;
    }
    empaquetarParaEnviar() {
        return {
            "lat": this.lat,
            "lng": this.lng
        };
    }
    compararPaquetes(pa2){
        let pa1=empaquetarParaEnviar();
        return (pa1.lat ===pa2.lat && pa1.lng === pa2.lng);
    }
}
module.exports = {
    Posicion
}