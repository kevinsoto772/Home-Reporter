const { remote , ipcRenderer} = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
let fs = require('fs');
const pdf = require('html-pdf');
const { default: Swal } = require("sweetalert2");
const utils = require('../../utils/format');


cargarFecha('fecha-reporte');

document.getElementById('fecha-reporte').addEventListener('change', ()=>{
  /* generarPDF(document.getElementById('fecha-reporte').value)  ; */
})

/* let content = pdfJS.generarPDF(document.getElementById('fecha-reporte').value); */

const buttonGenerarPDF = document.getElementById("generar-pdf");
buttonGenerarPDF.addEventListener("click", () => {
    generarPDF(document.getElementById('fecha-reporte').value).then(([ingresos, pagos, gastos, totalIngresos, totalPagos, totalGastos, impuestos]) =>{
      let contenedor = document.createElement('div');
      let contenido = document.createElement('body');
      var html = 
      `<html>
        <head>
          <style>
            *{
              font-family: 'Calibri'
            }
            table{
              border-collapse: collapse;
              margin-bottom: 2cm;
              max-width: 25cm;
            }
            .tabla-ingresos{
              width: 8cm;
            }
            td,th{
              border: 1px solid black;
              padding: 0.14cm 0.35cm;
            }
          </style>
        </head>
        <body>
        `
      ;
      html += 
      ` 
      <table class="tabla-pagos">
          <thead>
              <tr>
                <th colspan="20" style = "text-align: center">RELACIÓN DE PAGO SEGUN PROYECCIÓN BANCOLOMBIA ${document.getElementById('fecha-reporte').value}</th>
              </tr>
              <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Mes</th>
                  <th>Canon</th>
                  <th>Iva 1</th>
                  <th>Valor Administración</th>
                  <th>Retención Arrendatario</th>
                  <th>Retención Iva</th>
                  <th>Retención Ica</th>
                  <th>Total Recaudado</th>
                  <th>Comisión</th>
                  <th>Iva</th>
                  <th>Retención propietario</th>
                  <th>Seguro</th>
                  <th>4x mil</th>
                  <th>Otros descuentos</th>
                  <th>Provisión de Gastos</th>
                  <th>Provisión Iva</th>
                  <th>Neto a pagar</th>
                  <th>Fecha</th>
              </tr>
          </thead>
          <tbody  style="page-break-after: always"> 
      `;

      pagos.forEach(fila => {
        html += `<tr>`;
        for(propiedad in fila){
          if(propiedad == 'fecha'){
            let fecha = utils.convertirAFecha(fila[propiedad]);
            html += 
            `<td>${fecha}</td>`;
          }else if(propiedad == 'id_pagos' || propiedad == 'nombre' || propiedad == 'mes_de_pago'){
            html += 
            `<td> ${fila[propiedad]} </td>`;
          }else{
            let valor = utils.separadorDeMiles(fila[propiedad].toString());
            html += 
            `<td> ${valor} </td>`;
          }
        }
        html += `</tr>`;
    });

    if(totalPagos.length > 0){
      html += 

      `
      <tr>
        <td colspan="10" style = "text-align: center; font-weight: bold"> TOTAL </td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_comision.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_IVA.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_retencion.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_seguro.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_4_x_mil.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_otros.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_provision_gastos.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_provision_iva.toString())}</td>
        <td>${utils.separadorDeMiles(totalPagos[0].total_neto_pagar.toString())}</td>
        <td>${utils.convertirAFecha(totalPagos[0].fecha)}</td>
      </tr>
      `
    }

    html += `</tbody> </table>`;

    html += 
      ` 
      <table class="tabla-gastos" style = "display:block; float: left; margin-right: 2cm">
          <thead>
              <tr>
                <th colspan="4" style = "text-align: center">GASTOS</th>
              </tr>
              <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Concepto</th>
                  <th>Valor</th>
              </tr>
          </thead>
          <tbody  style="page-break-after: always"> 
      `;

      gastos.forEach(fila => {
          html += `<tr>`;
          for(propiedad in fila){
            if(propiedad == 'fecha'){
              /* let fecha = utils.convertirAFecha(fila[propiedad]);
              html += 
              `<td>${fecha}</td>`; */
            }else if(propiedad == 'valor'){
              let valor = utils.separadorDeMiles(fila[propiedad].toString());
              html += 
              `<td> ${valor} </td>`;

            }else if(propiedad == 'impuesto'){

            }else{
              html += 
              `<td> ${fila[propiedad]} </td>`;
            }
          }
          html += `</tr>`;
      });

      if(totalGastos.length > 0){
        html += 
  
        `
        <tr>
          <td colspan="3" style = "text-align: center; font-weight: bold"> TOTAL </td>
          <td>${utils.separadorDeMiles(totalGastos[0].Total_gastos.toString())}</td>
        </tr>
        `
      }

    html += `</tbody> </table>`;

    let totalImpuestos = 0;
    let totalProvIva = totalPagos.length > 0 ? totalPagos[0].total_provision_iva : 0;
    let totalProvGastos = totalPagos.length > 0 ? totalPagos[0].total_provision_gastos : 0;
    let totalGastosCuentas = totalGastos.length > 0 ? totalGastos[0].Total_gastos : 0;
    let totalNetoAPagar = totalPagos.length > 0 ? totalPagos[0].total_neto_pagar : 0;

    if(impuestos.length > 0){
      impuestos.forEach(impuesto =>{
        totalImpuestos += impuesto.valor;
      })
    }

    html += 
    `
    <table style = "display:block; float: left">
      <thead>
        <tr>
          <td>DETALLE DE CUENTA</td>
          <td>VALOR A PAGAR</td>
          <td>GIRO DE PROVISIONES</td>
        </tr>
      </thead>
      </tbody>
        <tr>
          <td>PROVISION DE IMPUESTO Y SEGURO BANCOLOMBIA ***0822</td>
          <td>${utils.separadorDeMiles(totalImpuestos.toString())}</td>
          <td>${utils.separadorDeMiles(totalProvIva.toString())}</td>
        </tr>
        <tr>
          <td>PROVISION DE GASTOS BANCOLOMBIA ***4303</td>
          <td>${utils.separadorDeMiles(totalGastosCuentas.toString())}</td>
          <td>${utils.separadorDeMiles(totalProvGastos.toString())}</td>
        </tr>
        <tr>
          <td>CTA PARA PAGOS BANCOLOMBIA ***7493</td>
          <td>${utils.separadorDeMiles(totalNetoAPagar.toString())}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <div style = "clear: both"></div>
    `

    html += 
      ` 
      <table class="tabla-ingresos">
          <thead>
              <tr>
                <th colspan="5" style = "text-align: center">INGRESOS</th>
              </tr>
              <tr>
                  <th>ID</th>
                  <th>Arrendatario</th>
                  <th>Banco</th>
                  <th>Valor</th>
                  <th>Fecha</th>
              </tr>
          </thead>
          <tbody  style="page-break-after: always"> 
      `;

      ingresos.forEach(fila => {
          html += `<tr>`;
          for(propiedad in fila){
            if(propiedad == 'fecha'){
              let fecha = utils.convertirAFecha(fila[propiedad]);
              html += 
              `<td>${fecha}</td>`;
            }else if(propiedad == 'valor'){
              let valor = utils.separadorDeMiles(fila[propiedad].toString());
              html += 
              `<td> ${valor} </td>`;
            }else{
              html += 
              `<td> ${fila[propiedad]} </td>`;
            }
          }
          html += `</tr>`;
      });

      if(totalIngresos.length > 0){
        html += 
  
        `
        <tr>
          <td colspan="3" style = "text-align: center; font-weight: bold"> TOTAL </td>
          <td>${utils.separadorDeMiles(totalIngresos[0].Total_ingresos.toString())}</td>
          <td>${utils.convertirAFecha(totalIngresos[0].fecha)}</td>
        </tr>
        `
      }
      
      html += `</tbody> </table> </body> </html>`;
      contenido.innerHTML = html;
      contenedor.appendChild(contenido);
      console.log(html);

      let options = { height:'30cm',width:'50cm'/*format: 'A3'*/, orientation: 'landscape',border: {
        top: "1cm",            // default is 0, units: mm, cm, in, px
        right: "1cm",
        bottom: "1cm",
        left: "1cm"
      }};
        pdf.create(contenedor.innerHTML, options).toFile(`./reporte ${document.getElementById('fecha-reporte').value}.pdf`, function(err, res) {
          if (err){
            Swal.fire({
              title: `¡Oops!`,
              text: 'Algo salió mal durante la generación del reporte',
              icon: 'error'
            })
          } else {
              Swal.fire({
                title: `Reporte ${document.getElementById('fecha-reporte').value} generado`,
                icon: 'success'
              })
          }
      });    
    });
});

function cargarFecha(idInput) {
  let fechaPagos = new Date(); // obtiene la fecha de hoy

  let fechaPagosInput = document.getElementById(idInput);
  let year = fechaPagos.getFullYear();
  let month =
    fechaPagos.getMonth() + 1 <= 9
      ? `0${fechaPagos.getMonth() + 1}`
      : fechaPagos.getMonth() + 1;
  let day =
    fechaPagos.getDate() <= 9
      ? `0${fechaPagos.getDate()}`
      : fechaPagos.getDate();
  let fechaHoy = `${year}-${month}-${day}`;
  fechaPagosInput.value = fechaHoy;
  fechaPagosInput.addEventListener("change", () => {
    fechaPagos = fechaPagosInput.value;
    console.log(fechaPagos);
  });
}

async function generarPDF(fecha){
  let [ingresos, pagos, gastos, totalIngresos, totalPagos, totalGastos, impuestos] = await Promise.all([
    main.obtenerIngresos(fecha),
    main.obtenerPagos(fecha),
    main.obtenerGastos(fecha),
    main.obtenerTotales2(fecha),
    main.obtenerTotales1(fecha),
    main.obtenerTotales3(fecha),
    main.ObtenerImpuesto(fecha)
  ]);
  console.log('totales 2',totalIngresos);
  console.log('totales 1',totalPagos);
  console.log('totales 3',totalGastos);
  console.log('Impuestos',impuestos);
  
  return [ingresos, pagos, gastos, totalIngresos, totalPagos, totalGastos, impuestos];
}

