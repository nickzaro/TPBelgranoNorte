class ManejadorHorarios {

    static esElHorario(hora, mapHoras) {
        let vecHoras = mapHoras.values();
        let encontrado = false;
        for (let i = 0; i < vecHoras.legth - 1; i++) {//tamaño -1  porque tengo que leer el penultimo y sacar el ultimo par comparar
            let hora1 = vecHoras[i];
            let hora2 = vecHoras[i + 1];
            if (this.estaEnElRango(hora, hora1, hora2)) {
                encontrado = true;

            }

        }
        return encontrado;
    }
    // compara si la hora actual esta en el rango
    static estaEnElRango(dateHora,horaI, horaF) {
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
        dateHora.setUTCHours(dateHora.getHours()); // hora actual de sistema con correccion -3 en argentina
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

    ///esta mal de alguna forma tengo que vincular el orden con el array horas
    static compararDosHoras(horax, hora2) {

        let res = 0;
        let [h1, m1] = parsearHora(horax);
        let [h2, m2] = parsearHora(hora2);
        if (h1 === "23")


            return res;


    }

    static parsearHora(hora) {
        return hora.split(":");

    }
}
module.exports = {
    ManejadorHorarios
}