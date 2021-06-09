const {remote} = require('electron');
const main = remote.require('./main.js')
const BrowserWindow = remote.BrowserWindow
const tables = require('../../utils/tables');
const total = require('../../controllers/total_ingresos');

tables.cargarFecha('fecha-ingresos', main.obtenerIngresos,'cuerpo-tabla', '../src/views/ingresos-crud/ingresos-crud.html','id_ingresos',main.obtenerTotales2 , 3,'id_Totales_2');

total.sumatoria(document.getElementById("fecha-ingresos").value);
document.getElementById('fecha-ingresos').addEventListener('change', ()=>{
  total.sumatoria(document.getElementById('fecha-ingresos').value);
})

const buttonIngresarIngreso = document.getElementById('ingresar-ingreso');
buttonIngresarIngreso.addEventListener('click', ()=>{
    redirectToTableIngresosNuevos()
});

