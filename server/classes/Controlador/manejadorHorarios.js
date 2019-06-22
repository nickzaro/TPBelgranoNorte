class ManejadorHorarios {

    static buscarEnElDia(hora, idOrigen, idDestino, mapMapHorario) {
        console.log(mapMapHorario);
        for (let [clave,map] of mapMapHorario) {
            
            if(this.esElHorario(hora,idOrigen,idDestino,map)){
                console.log(map);
                return true;
            }
        }
    }
    // recibe la hora del sistema, estacion actual del cliente, Estacion a donde se dirige, 
    static esElHorario(hora, idOrigen, idDestino, unMapHorario) {
        if (!unMapHorario.has(idOrigen) || !unMapHorario.has(idDestino)) { // si no esta el origen y destino en el mapa
            return false;
        }

        let vecHoras = [];
        let it = unMapHorario.entries();
        for (let i = 0; i < unMapHorario.size; i++) {
            vecHoras.push(it.next().value);
        }


        console.log(vecHoras);
        let encontrado = false;
        for (let i = 0; i < vecHoras.length - 1; i++) {//tamaño -1  porque tengo que leer el penultimo y sacar el ultimo par comparar
            let hora1 = vecHoras[i][1];
            let hora2 = vecHoras[i + 1][1];


            if (this.estaEnElRango(hora, hora1, hora2) && vecHoras[i + 1][0] === idOrigen) { // si esta en el rango, y es idOrigen es igual a la proxima estacion

                encontrado = true;
                console.log("i: ", i, " ENCONTRADO: ",encontrado, " LA HORA DE LA ESTACION ANTERIOR es:", hora1, "  LA HORA ACTUAL", hora, "  LA HORA DE LLEGADA ES:", hora2);
                return encontrado;
            }

        }
        //console.log("Fue encontrado: ",encontrado,"LA HORA DE ARRIBO es:",hora1, "  LA HORA DE LLEGADA ES:", hora2);
        return encontrado;
    }
    // compara si la hora actual (tiene que estar en UTC ver test ) esta en el rango
    static estaEnElRango(dateHora, horaI, horaF) {
        let [hi, mi] = this.parsearHora(horaI);
        let [hf, mf] = this.parsearHora(horaF);
        //let [h, m] = this.parsearHora(hora);
        let dateHoraI = new Date();
        let dateHoraF = new Date();

        dateHoraI.setUTCHours(parseInt(hi), parseInt(mi));
        dateHoraF.setUTCHours(parseInt(hf), parseInt(mf));
        //dateHora.setUTCHours(parseInt(h), parseInt(m));
        console.log("esta en el rango:", dateHoraI);
        //Cuando quisieramos obtener la hora exacta


        console.log("hora actual:", dateHora);
        if (dateHoraF < dateHoraI) {
            dateHoraF.setDate(dateHoraF.getDate() + 1);
        }
        console.log(dateHoraI, "<=", dateHora, "<=", dateHoraF);
        if (dateHoraI <= dateHora && dateHora <= dateHoraF) {
            return true;
        }
        return false;
    }

    static parsearHora(hora) {
        return hora.split(":");

    }
    static horaActualUTC() {
        let fechaActual = new Date();
        fechaActual.setUTCHours(fechaActual.getHours());
        return fechaActual;
    }
}
module.exports = {
    ManejadorHorarios
}