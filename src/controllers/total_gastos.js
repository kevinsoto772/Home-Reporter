const { remote } = require("electron");
const { userInfo } = require("os");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;

async function sumatoria(date) {
    let Total_gastos = 0;
    let fecha;

    let totales_gastos = {};

    fecha = date;
    let gasto = await main.obtenerGastos(date);
    if (gasto.length > 0) {
        gasto.forEach((gasto) => {
            let es_impuesto = gasto["impuesto"]; 
            for (let propiedad in gasto) {
                if(es_impuesto == 0){
                if (propiedad != "fecha") {
                    if (propiedad != "nombre" || propiedad != "concepto") {
                        if (propiedad == "valor") {
                            Total_gastos = Total_gastos + gasto[propiedad];
                            totales_gastos.Total_gastos = Total_gastos;
                    } else {
                        console.log("no es un total");
                    }
                }
             } else {
                    let day = gasto[propiedad].getDate();
                    let month = gasto[propiedad].getMonth() + 1;
                    let year = gasto[propiedad].getFullYear();

                    if (day < 10) {
                        fecha.value = `${year}-0${month}-0${day}`;
                    } else if (month < 10) {
                        fecha.value = `${year}-0${month}-${day}`;
                    } else fecha.value = `${year}-${month}-${day}`;

                    console.log(fecha);
                    totales_gastos.fecha = fecha;
                }
            
        }else{
            if (propiedad != "fecha") {
                if (propiedad != "nombre" || propiedad != "concepto") {
                    if (propiedad == "valor") {
                        Total_gastos = Total_gastos;
                        totales_gastos.Total_gastos = Total_gastos;
                } else {
                    console.log("no es un total");
                }
            }
         } else {
                let day = gasto[propiedad].getDate();
                let month = gasto[propiedad].getMonth() + 1;
                let year = gasto[propiedad].getFullYear();

                if (day < 10) {
                    fecha.value = `${year}-0${month}-0${day}`;
                } else if (month < 10) {
                    fecha.value = `${year}-0${month}-${day}`;
                } else fecha.value = `${year}-${month}-${day}`;

                console.log(fecha);
                totales_gastos.fecha = fecha;
            }
        }
        }
        });
        return totales_gastos;
    }
    return false;
}

async function insertNewGasto(date, totales_3) {
    /* const totales_1 = sumatoria(date); */

    let result = await main.ingresarTotales3(totales_3);
    console.log(result);
}

async function updateGasto(id, date, totales_3) {
    /*  const totales_1 = sumatoria(date); */

    let result = await main.actualizarTotales3(id, totales_3);
}

async function insertOrUpdatePago(date, totales_3) {
    let totales_3_actual = await main.obtenerTotales3(date);
    if (totales_3_actual.length > 0) {
        console.log(
            "parametros actualizar",
            totales_3_actual[0].id_Totales_3,
            date,
            totales_3
        );
        let newTotales_3 = await updateGasto(
            totales_3_actual[0].id_Totales_3,
            date,
            totales_3
        );
        return newTotales_3;
    } else {
        console.log("parametros ingresar", date, totales_3);
        let newTotales_3 = await insertNewGasto(date, totales_3);
        return newTotales_3;
    }
}

module.exports = {
    sumatoria,
    insertOrUpdatePago,
};


