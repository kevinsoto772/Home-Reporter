const { remote , ipcRenderer} = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
let fs = require('fs');
const pdf = require('html-pdf');
const utils = require('../../utils/format');


cargarFecha('fecha-reporte');

document.getElementById('fecha-reporte').addEventListener('change', ()=>{
  generarPDF(document.getElementById('fecha-reporte').value)  ;
})

let options = { 
  format: 'A3', 
  orientation: 'landscape',
  border: {
    top: "0cm",            // default is 0, units: mm, cm, in, px
    right: "0.64cm",
    bottom: "0cm",
    left: "0.64cm"
  },
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Fecha: 10/10/2010</div>'
  }
};

/* let content = pdfJS.generarPDF(document.getElementById('fecha-reporte').value); */

const buttonGenerarPDF = document.getElementById("generar-pdf");
buttonGenerarPDF.addEventListener("click", () => {
    generarPDF(document.getElementById('fecha-reporte').value).then((ingresos) =>{
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
              /* border: 2px solid black; */
              border-collapse: collapse;
            }
            .tabla-ingresos{
              width: 8cm;
            }
            td,th{
              border: 1px solid black;
              padding: 0.35cm;
            }
          </style>
        </head>
        <body>`
      ;
      html += 
      `
      <div id="pageHeader">Default header</div> 
      <table class="tabla-ingresos">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Arrendatario</th>
                  <th>Banco</th>
                  <th>Valor</th>
                  <th>Fecha</th>
              </tr>
          </thead>
          <tbody>
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
      html += `</tbody> </table> </body> </html>`;
      contenido.innerHTML = html;
      contenedor.appendChild(contenido);
      console.log(html);

      let options = { format: 'A3', orientation: 'landscape',border: {
          top: "0cm",            // default is 0, units: mm, cm, in, px
          right: "0.64cm",
          bottom: "0cm",
          left: "0.64cm"
        }};
        pdf.create(contenedor.innerHTML, options).toFile('./reporte.pdf', function(err, res) {
          if (err){
              console.log(err);
          } else {
              console.log(res);
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
  let ingresos = await main.obtenerIngresos(fecha);
  console.log(ingresos);
  
  return ingresos;
}

async function generarTabla(){
  
  return contenedor.innerHTML;
}


