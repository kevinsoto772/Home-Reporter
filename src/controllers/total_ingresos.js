const { remote } = require("electron");
const { userInfo } = require("os");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;

async function sumatoria(date) {
    let Total_ingresos = 0;
    let fecha;

    let totales_ingresos = {};

    fecha = date;
    let ingreso = await main.obtenerIngresos(date);
    if (ingreso.length > 0) {
        ingreso.forEach((ingreso) => {
            for (let propiedad in ingreso) {
                if (propiedad != "fecha") {
                    if (propiedad != "arrendatario" || propiedad != "banco") {
                        if (propiedad == "valor") {
                            Total_ingresos = Total_ingresos + ingreso[propiedad];
                            totales_ingresos.Total_ingresos = Total_ingresos;
                        }
                    } else {
                        console.log("no es un total");
                    }
                } else {
                    let day = ingreso[propiedad].getDate();
                    let month = ingreso[propiedad].getMonth() + 1;
                    let year = ingreso[propiedad].getFullYear();

                    if (day < 10) {
                        fecha.value = `${year}-0${month}-0${day}`;
                    } else if (month < 10) {
                        fecha.value = `${year}-0${month}-${day}`;
                    } else fecha.value = `${year}-${month}-${day}`;

                    console.log(fecha);
                    totales_ingresos.fecha = fecha;
                }
            }
        });
        return totales_ingresos;
    }
    return false;
}

async function insertNewIngreso(date, totales_2) {
    /* const totales_1 = sumatoria(date); */

    let result = await main.ingresarTotales2(totales_2);
    console.log(result);
}

async function updateIngreso(id, date, totales_2) {
    /*  const totales_1 = sumatoria(date); */

    let result = await main.actualizarTotales2(id, totales_2);
}

async function insertOrUpdatePago(date, totales_2) {
    let totales_2_actual = await main.obtenerTotales2(date);
    if (totales_2_actual.length > 0) {
        console.log(
            "parametros actualizar",
            totales_2_actual[0].id_Totales_2,
            date,
            totales_2
        );
        let newTotales_2 = await updateIngreso(
            totales_2_actual[0].id_Totales_2,
            date,
            totales_2
        );
        return newTotales_2;
    } else {
        console.log("parametros ingresar", date, totales_2);
        let newTotales_2 = await insertNewIngreso(date, totales_2);
        return newTotales_2;
    }
}

module.exports = {
    sumatoria,
    insertOrUpdatePago,
};
