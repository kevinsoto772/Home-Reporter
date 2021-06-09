const { remote } = require("electron");
const { userInfo } = require("os");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;


async function sumatoria(date) {
let Total_comision = 0;
let Total_iva = 0;
let Total_retencion_prop = 0;
let Total_seguro = 0;
let total_provision_gastos = 0;
let total_provision_iva = 0;
let total_neto_pagar = 0;
let Total_x4_mil = 0;
let Total_otrs_des = 0;
let fecha;

let total_pagos = {};

  fecha = date;
  let pago = await main.obtenerPagos(date);
  if (pago.length > 0) {
    pago.forEach((pago) => {
      for (let propiedad in pago) {
        if (propiedad != "fecha") {
          if (
            propiedad != "nombre" ||
            propiedad != "mes_de_pago" ||
            propiedad != "canon" ||
            propiedad != "iva_1" ||
            propiedad != "valor_admin" ||
            propiedad != "retencion_arren" ||
            propiedad != "retencion_iva" ||
            propiedad != "retencion_ica" ||
            propiedad != "total_recaudado"
          ) {
            if (propiedad == "comision") {
              Total_comision = Total_comision + pago[propiedad];
              total_pagos.total_comision = Total_comision;
            } else if (propiedad == "iva") {
              Total_iva = Total_iva + pago[propiedad];
              total_pagos.total_IVA = Total_iva;
            } else if (propiedad == "retencion_prop") {
              Total_retencion_prop = Total_retencion_prop + pago[propiedad];
              total_pagos.total_retencion = Total_retencion_prop;
            } else if (propiedad == "seguro") {
              Total_seguro = Total_seguro + pago[propiedad];
              total_pagos.total_seguro = Total_seguro;
            } else if (propiedad == "x4_mil") {
              Total_x4_mil = Total_x4_mil + pago[propiedad];
              total_pagos.total_4_x_mil = Total_x4_mil;
            } else if (propiedad == "otros_des") {
              Total_otrs_des = Total_otrs_des + pago[propiedad];
              total_pagos.Total_otros = Total_otrs_des;
            } else if (propiedad == "provision_gastos") {
              total_provision_gastos = total_provision_gastos + pago[propiedad];
              total_pagos.total_provision_gastos = total_provision_gastos;
            } else if (propiedad == "provision_iva") {
              total_provision_iva = total_provision_iva + pago[propiedad];
              total_pagos.total_provision_iva = total_provision_iva;
            } else if (propiedad == "neto_pagar") {
              total_neto_pagar = total_neto_pagar + pago[propiedad];
              total_pagos.total_neto_pagar = total_neto_pagar;
            } else {

            }
          } else {
            console.log("no es un total");
          }
        } else {
          let day = pago[propiedad].getDate();
          let month = pago[propiedad].getMonth() + 1;
          let year = pago[propiedad].getFullYear();

          if (day < 10) {
            fecha.value = `${year}-0${month}-0${day}`;
          } else if (month < 10) {
            fecha.value = `${year}-0${month}-${day}`;
          } else fecha.value = `${year}-${month}-${day}`;

          console.log(fecha);
          total_pagos.fecha = fecha;
          
        }
      }
    });
    return total_pagos;
  }
  return false;
}

async function insertNewPago(date, totales_1) {
  /* const totales_1 = sumatoria(date); */

  let result = await main.ingresarTotales1(totales_1);
  console.log(result);
}

async function updatePago(id, date, totales_1){
 /*  const totales_1 = sumatoria(date); */

  let result = await main.actualizarTotales1(id, totales_1);
}

async function insertOrUpdatePago(date, totales_1){
  let totales_1_actual = await main.obtenerTotales1(date);
  if(totales_1_actual.length > 0){
    console.log('parametros actualizar', totales_1_actual[0].id_Totales_1, date, totales_1);
    let newTotales_1 = await updatePago(totales_1_actual[0].id_Totales_1, date, totales_1);
    return newTotales_1;
  }else{
    console.log('parametros ingresar', date, totales_1);
    let newTotales_1 = await insertNewPago(date, totales_1);
    return newTotales_1;
  }
}

module.exports = {
  sumatoria,
  insertOrUpdatePago
};

