const { remote , ipcRenderer} = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const tables = require('../../utils/tables');
const total = require('../../controllers/total_pagos');

tables.cargarFecha('fecha-pagos', main.obtenerPagos,'cuerpo-tabla', '../src/views/pagos-crud/pagos-crud.html','id_pagos', main.obtenerTotales1 , 10,'id_Totales_1');
total.sumatoria(document.getElementById("fecha-pagos").value);
document.getElementById('fecha-pagos').addEventListener('change', ()=>{
  total.sumatoria(document.getElementById('fecha-pagos').value);
})


const buttonIngresarPago = document.getElementById("ingresar-pago");
buttonIngresarPago.addEventListener("click", () => {
  redirectToTablePagosNuevos();
});




