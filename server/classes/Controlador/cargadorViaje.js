class CargadorViaje {
    constructor(grilla, estaciones, sentido) {
        this.id = 0;
        this.grilla = grilla;
        this.estaciones = estaciones;
        this.sentido = sentido;
        this.recorridos = new Map();
        if (sentido === "ida") {
            this.procesar(this.cargarViajeIda);
        } else {
            this.procesar(this.cargarViajeVuelta);
        }

    }

    procesar(funcion) {
        let i = 0;
        this.grilla.forEach(element => {
            //console.log(element);
            //console.log("ooooooooooooooooooooooo");
            this.recorridos.set(i++, funcion(element));
        });
        //console.log(this.recorridos.size);

    }
    cargarViajeVuelta(recorrido) {
        let rec = new Map();
        let i = 20;
        recorrido.forEach(element => {
            if (element != "") {
                rec.set(i, element);
            }
            i--;
        });
        // console.log(rec);
        return rec;

    }
    cargarViajeIda(recorrido) {
        let rec = new Map();
        let i = 0;
        recorrido.forEach(element => {
            if (element != "") {
                rec.set(i, element);
            }
            i++;
        });
        // console.log(rec);
        return rec;
    }
    empaquetar(i) { // seria empaquetar un recorrido

    }

}
module.exports = {
    CargadorViaje
}