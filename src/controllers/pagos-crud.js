const { remote, ipcRenderer } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const Swal = require("sweetalert2");
const total = require('../../controllers/total_pagos');

let idAManipular; //coment
let nombre = document.getElementById("nombre");
let mes_de_pago = document.getElementById("mes");
let canon = document.getElementById("canon");
let valor_admin = document.getElementById("admin");
let retencion_iva = document.getElementById("retencion-iva");
let retencion_ica = document.getElementById("retencion-ica");
let x4_mil = document.getElementById("4x-mil");
let otros_des = document.getElementById("otros-des");
let fecha = document.getElementById("fecha");


/* conseguirpago(idAManipular); */



ipcRenderer.on("registro", (event, info) => {
  const buttonEliminarPago = document.getElementById("eliminar");
  buttonEliminarPago.addEventListener("click", () => {
    borrarPago(idAManipular);
  });
  const buttonUpdatePago = document.getElementById("actualizar");
  buttonUpdatePago.addEventListener("click", () => {
    //AQUI TERMINAN LOS CALCULOS !!!!
    let iva_option = document.getElementById("opcion_iva").value;
  let retencion_A_option = document.getElementById("opcion_retencion_arren").value;
  let reten_prop_option = document.getElementById("opcion_reten_prop").value;
  let seguro_option = document.getElementById("opcion_seguro").value;
    let iva_1;
    let retencion_arren;
    let retencion_prop;
    let seguro;
    if(iva_option == "si"){
      iva_1 = parseInt(canon.value) * 0.19;
     }else{
       iva_1 = 0;
     }
     if(retencion_A_option == "si"){
      retencion_arren = parseInt(canon.value) * 0.035;
    }else{
      retencion_arren = 0;
    }
  
    let total_recaudado = parseInt(canon.value) + iva_1 + parseInt(valor_admin.value) - parseInt(retencion_iva.value) - parseInt(retencion_ica.value) - retencion_arren;
    let comision = (parseInt(canon.value) + iva_1 + parseInt(valor_admin.value)) * 0.08;
    let iva = comision * 0.19;
    if(reten_prop_option  == "si"){
     retencion_prop = comision * 0.11;
   }else{
     retencion_prop = 0;
   }
   if(seguro_option == "si"){
    seguro = total_recaudado * 0.02;
  }else{
    seguro = 0;
  }
    let provision_gastos = comision + parseInt(x4_mil.value);
    let provision_iva = seguro + iva;
    let neto_pagar = total_recaudado + retencion_prop - provision_gastos - provision_iva;
    //AQUI TERMINAN LOS CALCULOS !!!!
    const pago = {
      nombre: nombre.value,
      mes_de_pago:mes_de_pago.value,
      canon: canon.value,
      iva_1,
      valor_admin: valor_admin.value,
      retencion_iva: retencion_iva.value,
      retencion_ica: retencion_ica.value,
      otros_des: otros_des.value,
      x4_mil : x4_mil.value,
      fecha: fecha.value,
      total_recaudado,
      comision,
      iva,
      retencion_prop,
      seguro,
      retencion_arren,
      provision_gastos,
      provision_iva,
      neto_pagar
    };
    ActualizarPago(idAManipular, pago);
  });

  console.log(info);
  idAManipular = info;
  conseguirpago(idAManipular);

});

async function conseguirpago(idAManipular) {
    let pago = await main.obtenerPago(idAManipular);
  console.log(pago);

  nombre.value = pago[0].nombre;
  mes_de_pago.value = pago[0].mes_de_pago;
  canon.value = pago[0].canon;
  valor_admin.value = pago[0].valor_admin;
  retencion_iva.value = pago[0].retencion_iva;
  retencion_ica.value = pago[0].retencion_ica;
  x4_mil.value = pago[0].x4_mil;
  otros_des.value = pago[0].otros_des;

  let day = pago[0].fecha.getDate();
  let month = pago[0].fecha.getMonth() + 1;
  let year = pago[0].fecha.getFullYear();

  if (day < 10) {
    fecha.value = `${year}-0${month}-0${day}`;
  }else if(month < 10){
    fecha.value = `${year}-0${month}-${day}`;
  }else fecha.value = `${year}-${month}-${day}`;
}


async function ActualizarPago(idAManipular, pago) {
  Swal.fire({
    title: "¿Seguro que quieres actualizar este pago?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Actualizar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let actualizacion = await main.actualizarPago(idAManipular, pago);
      let totales_1 = await total.sumatoria(fecha.value);
      total.insertOrUpdatePago(fecha.value, totales_1);
      console.log(actualizacion);
      Swal.fire("Actualizado", "", "success");
      limpiarFormulario();
    }
  });

}

async function borrarPago(idAManipular) {
  Swal.fire({
    title: "¿Seguro que quieres eliminar este pago?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Eliminar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let resultado = await main.eliminarPago(idAManipular);
      let totales_1 = await total.sumatoria(fecha.value);
      total.insertOrUpdatePago(fecha.value, totales_1);
      console.log(resultado);
      Swal.fire("Eliminado", "", "success");
      limpiarFormulario();
    }
  });
}

function limpiarFormulario() {
  document.getElementById("form1").reset();
}


