const { remote } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const format = require('../utils/format');

async function showTable(fecha, funcionObtener, funcionObtenerTotales, colspan, idCuerpoTabla, nombreDelId) {
  let cuerpoTabla = document.getElementById(idCuerpoTabla);
  while (cuerpoTabla.firstChild) {
    cuerpoTabla.removeChild(cuerpoTabla.firstChild);  }

  let pagos = await funcionObtener(fecha);  

  if (pagos.length > 0) {    
    pagos.forEach((pago) => {      
      let tr = document.createElement("tr");
      tr.setAttribute('class', 'registro');
      tr.dataset.id = pago[nombreDelId];
      for (let propiedad in pago) {
        let td = document.createElement("td");
        if (propiedad != "fecha") {
          if (propiedad == 'id_pagos' || propiedad == 'nombre' || propiedad == 'mes_de_pago' || propiedad == 'arrendatario' || propiedad == 'id_ingresos' || propiedad == 'banco' || propiedad == 'id_gastos' || propiedad == 'concepto' ) {
            td.innerHTML = pago[propiedad];
            tr.appendChild(td);
          }else if(propiedad == "impuesto"){

          }
            else {
            td.innerHTML = format.separadorDeMiles(pago[propiedad].toString());
            tr.appendChild(td);
          }
        } else {
          let day = pago[propiedad].getDate()
          let month = pago[propiedad].getMonth() + 1
          let year = pago[propiedad].getFullYear()
          if (day < 10) {
            td.innerHTML = `${year}/0${month}/0${day}`;
          } else if (month < 10) {
            td.innerHTML = `${year}/0${month}/${day}`;
          } else
            td.innerHTML = `${year}/${month}/${day}`;
          tr.appendChild(td);
        }
      }
      cuerpoTabla.appendChild(tr);
    });    
  } else {
  }
}

function cargarFecha(idInput, funcionObtener, idCuerpoTabla, modal, nombreDelId, funcionObtenerTotales,colspan,idTotales) {

  let fechaPagos = new Date(); // obtiene la fecha de hoy

  let fechaPagosInput = document.getElementById(idInput);
  let year = fechaPagos.getFullYear();
  let month = fechaPagos.getMonth() + 1 <= 9 ? `0${fechaPagos.getMonth() + 1}` : fechaPagos.getMonth() + 1;
  let day = fechaPagos.getDate() <= 9 ? `0${fechaPagos.getDate()}` : fechaPagos.getDate();
  let fechaHoy = `${year}-${month}-${day}`;
  fechaPagosInput.value = fechaHoy;
  showTable(fechaHoy, funcionObtener, funcionObtenerTotales, colspan, idCuerpoTabla, nombreDelId);
  console.log('antes de agregarCrud()');
  agregarCrud(modal, funcionObtener, fechaHoy, nombreDelId);
  agregarTotales(fechaHoy, funcionObtenerTotales, idCuerpoTabla, colspan, idTotales)
  fechaPagosInput.addEventListener('change', () => {
    fechaPagos = fechaPagosInput.value;
    console.log(fechaPagos);
    showTable(fechaPagos, funcionObtener, funcionObtenerTotales, colspan, idCuerpoTabla, nombreDelId);
    console.log('antes de agregarCrud()');
    agregarCrud(modal, funcionObtener, fechaPagos, nombreDelId);
    agregarTotales(fechaPagos, funcionObtenerTotales, idCuerpoTabla, colspan, idTotales) 
  });
}

async function agregarCrud(modal, funcionObtener, fecha, nombreDelId) {
  let registrosDb = await funcionObtener(fecha);
  if (registrosDb.length > 0) {
    document.querySelectorAll('.registro').forEach(registro => {
      registro.addEventListener('click', () => {
        console.log('click')
        console.log(registro.dataset.id)
        let crudWindow = new BrowserWindow({
          resizable: false,
          width: 900,
          height: 600,
          webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
          }
        });
        crudWindow.loadFile(modal);
        crudWindow.on('ready-to-show', () => {
          crudWindow.webContents.send('registro', registro.dataset.id);
        });
      });
    })
  } else {
    console.log('No hay registros para esta fecha');
  }
}

async function agregarTotales( fecha, funcionObtenerTotales, idCuerpoTabla, colspan, idTotales ){
  let cuerpoTabla = document.getElementById(idCuerpoTabla);
  let totales = await funcionObtenerTotales(fecha);
  let totalesTr = document.createElement("tr");
  totalesTr.setAttribute('class', 'totales');
  tdColSpan = document.createElement("td");
  tdColSpan.setAttribute('colspan', colspan);
  tdColSpan.innerHTML = 'TOTAL';
  tdColSpan.style.cssText = ' text-align: center;';
  totalesTr.appendChild(tdColSpan);
  for(let propiedad in totales[0]){
    if(propiedad == 'fecha'){
      let td = document.createElement('td');
      let day = totales[0][propiedad].getDate()
      let month = totales[0][propiedad].getMonth() + 1
      let year = totales[0][propiedad].getFullYear()
      if (day < 10) {
        td.innerHTML = `${year}/0${month}/0${day}`;
      } else if (month < 10) {
        td.innerHTML = `${year}/0${month}/${day}`;
      } else{
        td.innerHTML = `${year}/${month}/${day}`;
      }
      totalesTr.appendChild(td);
    }else{
      if(propiedad == idTotales){
      }else{
        let td = document.createElement("td");
        td.innerHTML = totales[0][propiedad];
        td.innerHTML = format.separadorDeMiles(totales[0][propiedad].toString());
        totalesTr.appendChild(td);
      } 
    }
  }
  cuerpoTabla.appendChild(totalesTr);
}

module.exports = {
  showTable,
  cargarFecha,
  agregarCrud,
  agregarTotales
}