class Posicion {
    constructor(posicionObj) {
        console.log(posicionObj);
        this.lat = posicionObj[0];
        this.lng = posicionObj[1];
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
        return [this.lat, this.lng];
    }
    // otra posicion del mismo tipo de la clase
    compararPosicion(pa2) {
        return (this.lat === pa2.lat && this.lng === pa2.lng);
    }
    compararPosicionRaw(pa2) {
        return (this.lat === pa2[0] && this.lng === pa2[1]);
    }
    resetPosicion() {
        this.lat = 0;
        this.lng = 0;
    }

}
module.exports = {
    Posicion
}