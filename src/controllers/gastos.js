const {remote} = require('electron');
const main = remote.require('./main.js')
const BrowserWindow = remote.BrowserWindow
const tables = require('../../utils/tables');
const total = require('../../controllers/total_gastos');


tables.cargarFecha('fecha-gastos', main.obtenerGastos,'cuerpo-tabla', '../src/views/gastos-crud/gastos-crud.html','id_gastos',main.obtenerTotales3, 3,'id_Totales_3');

total.sumatoria(document.getElementById("fecha-gastos").value);
document.getElementById('fecha-gastos').addEventListener('change', ()=>{
  total.sumatoria(document.getElementById('fecha-gastos').value);
})


const buttonIngresarGasto = document.getElementById('ingresar-gasto');
buttonIngresarGasto.addEventListener('click', ()=>{
    redirectToTableGastosNuevos()
});
