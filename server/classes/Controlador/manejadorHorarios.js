class ManejadorHorarios {

    //NO TERMINADO
    static buscarEnElDia(hora, idOrigen, idDestino, mapMapHorario) {
      //  console.log(mapMapHorario);
        for (let [clave, map] of mapMapHorario) {

            if (this.esElHorario(hora, idOrigen, idDestino, map)) {
             //   console.log(map);
                return true;
            }
        }
    }
    // recibe la hora del sistema, estacion actual del cliente, Estacion a donde se dirige, 
    static esElHorario(hora, idOrigen, idDestino, unMapHorario) {
        if (!unMapHorario.has(idOrigen) || !unMapHorario.has(idDestino)) { // si no esta el origen y destino en el mapa
            return false;
        }
        let vecHoras = mapHorasAVecHoras(unMapHorario);

       // console.log(vecHoras);
        let encontrado = false;
        for (let i = 0; i < vecHoras.length - 1; i++) {//tamaño -1  porque tengo que leer el penultimo y sacar el ultimo par comparar
            let hora1 = vecHoras[i][1];
            let hora2 = vecHoras[i + 1][1];


            if (this.estaEnElRango(hora, hora1, hora2) && vecHoras[i + 1][0] === idOrigen) { // si esta en el rango, y es idOrigen es igual a la proxima estacion

                encontrado = true;
              //  console.log("i: ", i, " ENCONTRADO: ", encontrado, " LA HORA DE LA ESTACION ANTERIOR es:", hora1, "  LA HORA ACTUAL", hora, "  LA HORA DE LLEGADA ES:", hora2);
                return encontrado;
            }

        }
        //console.log("Fue encontrado: ",encontrado,"LA HORA DE ARRIBO es:",hora1, "  LA HORA DE LLEGADA ES:", hora2);
        return encontrado;
    }

    // compara si la hora actual (tiene que estar en UTC ver test ) esta en el rango
    static estaEnElRango(dateHora, horaI, horaF) {
        let dateHoraI = this.horaUTCdeString(horaI);
        let dateHoraF = this.horaUTCdeString(horaF);

      //  console.log("hora actual:", dateHora);
        if (dateHoraF < dateHoraI) {
            dateHoraF.setDate(dateHoraF.getDate() + 1);
        }
     //   console.log(dateHoraI, "<=", dateHora, "<=", dateHoraF);
        if (dateHoraI <= dateHora && dateHora <= dateHoraF) {
            return true;
        }
        return false;
    }


    static menorTiempoLlegaEstacion(idOrigen, idDestino, mapMapHorario) {
        let tiempoMinimo = 10000000;
        let tiempo = 0;
        let res = {
            idViaje: -1,
            idOrigen: idOrigen,
            idDestino: idDestino,
            horaActual:this.horaActualUTC(),
            tiempoMinimo:-1
        };
        for (let [clave, map] of mapMapHorario) {
            tiempo = this.tiempoSegunID(idOrigen,idDestino,map);
            if(tiempo > 0 && tiempoMinimo>=tiempo){
                tiempoMinimo = tiempo;
                res.idViaje = clave;
                res.tiempoMinimo = tiempoMinimo;
            }
        }
        // console.log(mapMapHorario.get(res.idViaje));
       // console.log(res);
        return res;
    }
    // tiempo entre la hora actual y un recorrido para una estacion dada
    static tiempoSegunID(idOrigen, idDestino, mapHorario) {
        if (!mapHorario.has(idOrigen) || !mapHorario.has(idDestino)) { // si no esta el origen y destino en el mapa
            return -1;
        }
        let mapHorariosDate = this.stringHorasADate(mapHorario);
        let horaDateActual = this.horaActualUTC();
        let horaDate = mapHorariosDate.get(idOrigen);
       // console.log(horaDateActual);
       // console.log(horaDate);
       // console.log((horaDate-horaDateActual)/1000);
        return  (horaDate - horaDateActual)/1000;

    }
 // Menor estacion origen que tiene el menor tiempo
    static menorTiempoSalidaEstacion(idOrigen, idDestino, mapMapHorario) {
        let tiempoMinimo = 10000000;
        let tiempo = 0;
        let res = {
            idViaje: -1,
            idOrigen: idOrigen,
            idDestino: idDestino,
            horaActual:this.horaActualUTC(),
            tiempoMinimo:-1
        };
        for (let [clave, map] of mapMapHorario) {
            tiempo = this.tiempoAnteriorSegunID(idOrigen,idDestino,map);
            if(tiempo > 0 && tiempoMinimo>=tiempo){
                tiempoMinimo = tiempo;
                res.idViaje = clave;
                res.tiempoMinimo = tiempoMinimo;
            }
        }
       // console.log(mapMapHorario.get(res.idViaje-1));
       //  console.log(mapMapHorario.get(res.idViaje));
       //  console.log(mapMapHorario.get(res.idViaje+1));
       // console.log(res);
        return res;
    }
// el menor tiempo de la posicion - el origen
    static tiempoAnteriorSegunID(idOrigen, idDestino, mapHorario) {
        if (!mapHorario.has(idOrigen) || !mapHorario.has(idDestino)) { // si no esta el origen y destino en el mapa
            return -1;
        }
        let mapHorariosDate = this.stringHorasADate(mapHorario);
        let horaDateActual = this.horaActualUTC();
        let horaDate = mapHorariosDate.get(idOrigen);
       // console.log(horaDateActual);
       // console.log(horaDate);
       // console.log((horaDate-horaDateActual)/1000);
        return  (horaDateActual-horaDate)/1000;

    }

    static stringHorasADate(mapHorario) {
        let mapHorariosDate = new Map();
        let noAnterior = true;
        let anterior = new Date();
        for (let [clave, hora] of mapHorario) {//tamaño -1  porque tengo que leer el penultimo y sacar el ultimo par comparar

            let dateHora1 = this.horaUTCdeString(hora);
            if (noAnterior) {
                anterior = this.horaUTCdeString(hora);
                noAnterior = false;
            }

            if (dateHora1 < anterior) {
                dateHora1.setDate(dateHora1.getDate() + 1);
            }
            mapHorariosDate.set(clave, dateHora1);
            anterior = dateHora1;
        }
      //  console.log("En formato string:", mapHorario);
      //  console.log("En formato Date", mapHorariosDate);
        return mapHorariosDate;

    }



    static parsearHora(hora) {
        return hora.split(":");

    }
    static mapHorasAVecHoras(mapHorario) {
        let vecHoras = [];
        let it = mapHorario.entries();
        for (let i = 0; i < mapHorario.size; i++) {
            vecHoras.push(it.next().value);
        }
        return vecHoras;
    }

    static horaUTCdeString(hora) {
        let [h, m] = this.parsearHora(hora);
        let dateHora = new Date();
        dateHora.setUTCHours(parseInt(h), parseInt(m), 0);
        return dateHora;
    }
    static horaActualUTC(hora) {
        let fechaActual = new Date();
        fechaActual.setUTCHours(fechaActual.getHours());
        return fechaActual;
    }
}
module.exports = {
    ManejadorHorarios
}