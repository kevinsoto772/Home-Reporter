const { remote } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const Swal = require("sweetalert2");
const total = require('../../controllers/total_pagos');

const buttonIngresarPago = document
  .getElementById("ingresar")
  .addEventListener("click", () => {
    insertNewPago();
  });
const buttonCancelarPago = document
  .getElementById("cancelar")
  .addEventListener("click", () => {
    remote.getCurrentWindow().close();
  });

async function insertNewPago() {
  let nombre = document.getElementById("nombre").value;
  let mes_de_pago = document.getElementById("mes-de-pago").value;
  let canon = parseInt(document.getElementById("canon").value);
  let valor_admin = parseInt(document.getElementById("admin").value);
  let retencion_iva = parseInt(document.getElementById("retencion-iva").value);
  let retencion_ica = parseInt(document.getElementById("retencion-ica").value);
  let otros_des = parseInt(document.getElementById("otros-des").value);
  let x4_mil = parseInt(document.getElementById("4x-mil").value);
  let fecha = document.getElementById("fecha").value;
  let iva_option = document.getElementById("opcion_iva").value;
  let retencion_A_option = document.getElementById("opcion_retencion_arren").value;
  let reten_prop_option = document.getElementById("opcion_reten_prop").value;
  let seguro_option = document.getElementById("opcion_seguro").value;

  let iva_1;
  let retencion_arren;
  let retencion_prop;
  let seguro;
  
  if (iva_option == "si") {
    iva_1 = canon * 0.19;
  } else {
    iva_1 = 0;
  }

  if (retencion_A_option == "si") {
    retencion_arren = canon * 0.035;
  } else {
    retencion_arren = 0;
  }
  let total_recaudado = canon + iva_1 + valor_admin - retencion_iva - retencion_ica - retencion_arren; 
  let comision = (canon + iva_1 + valor_admin) * 0.08;
  if (reten_prop_option == "si") {
    retencion_prop = comision * 0.11;
  } else {
    retencion_prop = 0;
  }

  if (seguro_option == "si") {
    seguro = total_recaudado * 0.02;
  } else {
    seguro = 0;
  }

  let iva = comision * 0.19;
  let provision_gastos = comision + x4_mil;
  let provision_iva = seguro + iva;
  let neto_pagar =total_recaudado + retencion_prop - provision_gastos - provision_iva;

  const pago = {
    nombre,
    mes_de_pago,
    canon,
    iva_1,
    valor_admin,
    retencion_iva,
    retencion_ica,
    otros_des,
    x4_mil,
    fecha,
    total_recaudado,
    comision,
    iva,
    retencion_prop,
    seguro,
    retencion_arren,
    provision_gastos,
    provision_iva,
    neto_pagar,
  };
  Swal.fire({
    title: "¿Seguro que quieres ingresar este pago?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Ingresar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let result = await main.ingresarNuevoPago(pago);
      let totales_1 = await total.sumatoria(fecha);
      total.insertOrUpdatePago(fecha, totales_1);
      console.log(result);
      Swal.fire("Ingresado", "", "success");
      limpiarFormulario();
    }
  });
}
function limpiarFormulario() {
  document.getElementById("form1").reset();
}
