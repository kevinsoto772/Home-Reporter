const { remote } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const format = require("../utils/format");

async function showTable(
  fecha,
  idCuerpoTabla,
  funcionObtenerTotales1,
  funcionObtenerTotales3
) {
  let cuerpoTabla = document.getElementById(idCuerpoTabla);
  while (cuerpoTabla.firstChild) {
    cuerpoTabla.removeChild(cuerpoTabla.firstChild);
  }
  let [totales1, totales3, impuestos] = await Promise.all([
    funcionObtenerTotales1(fecha),
    funcionObtenerTotales3(fecha),
    sumarImpuestos(fecha)
  ]);
  console.log(totales1);
  console.log(impuestos);
  let tr1 = document.createElement("tr");
  let tr2 = document.createElement("tr");
  let tr3 = document.createElement("tr");

  let tdCuenta = document.createElement("td");
  tdCuenta.textContent = "PROVISION DE IMPTO Y SEGURO BANCOLOMBIA ***0822"; 
  tr1.appendChild(tdCuenta);

  let tdCuenta2 = document.createElement("td");
  tdCuenta2.textContent = "PROVISION DE GASTOS BANCOLOMBIA ***4303"; 
  tr2.appendChild(tdCuenta2);

  let tdCuenta3 = document.createElement("td");
  tdCuenta3.textContent = "CTA PARA PAGOS BANCOLOMBIA ****7493"; 
  tr3.appendChild(tdCuenta3);

  if (totales1.length > 0 && totales3.length > 0 && impuestos > 0) {
    let tdnuevo = document.createElement("td");
    tdnuevo.textContent = format.separadorDeMiles(
      impuestos.toString()
    );;
    tr1.appendChild(tdnuevo);

    let tdPiva = document.createElement("td");
    tdPiva.textContent = format.separadorDeMiles(
      totales1[0].total_provision_iva.toString()
    );
    tr1.appendChild(tdPiva);

    let tdValor = document.createElement("td");
    tdValor.textContent = format.separadorDeMiles(
      totales3[0].Total_gastos.toString()
    );
    tr2.appendChild(tdValor);

    let tdPgasto = document.createElement("td");
    tdPgasto.textContent = format.separadorDeMiles(
      totales1[0].total_provision_gastos.toString()
    );
    tr2.appendChild(tdPgasto);

    let tdNeto = document.createElement("td");
    tdNeto.textContent = format.separadorDeMiles(
      totales1[0].total_neto_pagar.toString()
    );
    tr3.appendChild(tdNeto);
  }else if(totales1.length > 0 && totales3.length == 0 && impuestos == 0){
      let tdnuevo = document.createElement("td");
      tdnuevo.textContent = "0";
      tr1.appendChild(tdnuevo);
  
      let tdPiva = document.createElement("td");
      tdPiva.textContent = format.separadorDeMiles(
        totales1[0].total_provision_iva.toString()
      );
      tr1.appendChild(tdPiva);
  
      let tdValor = document.createElement("td");
      tdValor.textContent ="0";
      tr2.appendChild(tdValor);
  
      let tdPgasto = document.createElement("td");
      tdPgasto.textContent = format.separadorDeMiles(
        totales1[0].total_provision_gastos.toString()
      );
      tr2.appendChild(tdPgasto);
  
      let tdNeto = document.createElement("td");
      tdNeto.textContent = format.separadorDeMiles(
        totales1[0].total_neto_pagar.toString()
      );
      tr3.appendChild(tdNeto);
  }else if(totales1.length > 0 && totales3.length == 0 && impuestos > 0){
    let tdnuevo = document.createElement("td");
    tdnuevo.textContent = format.separadorDeMiles(
      impuestos.toString()
    );
    tr1.appendChild(tdnuevo);

    let tdPiva = document.createElement("td");
    tdPiva.textContent = format.separadorDeMiles(
      totales1[0].total_provision_iva.toString()
    );
    tr1.appendChild(tdPiva);

    let tdValor = document.createElement("td");
    tdValor.textContent = "0";
    tr2.appendChild(tdValor);

    let tdPgasto = document.createElement("td");
    tdPgasto.textContent = format.separadorDeMiles(
      totales1[0].total_provision_gastos.toString()
    );
    tr2.appendChild(tdPgasto);

    let tdNeto = document.createElement("td");
      tdNeto.textContent = format.separadorDeMiles(
        totales1[0].total_neto_pagar.toString()
      );
    tr3.appendChild(tdNeto);
  }else if(totales1.length > 0 && totales3.length > 0 && impuestos == 0){
    let tdnuevo = document.createElement("td");
    tdnuevo.textContent = "0";
    tr1.appendChild(tdnuevo);

    let tdPiva = document.createElement("td");
    tdPiva.textContent = format.separadorDeMiles(
      totales1[0].total_provision_iva.toString()
    );
    tr1.appendChild(tdPiva);

    let tdValor = document.createElement("td");
    tdValor.textContent = format.separadorDeMiles(
      totales3[0].Total_gastos.toString()
    );
    tr2.appendChild(tdValor);

    let tdPgasto = document.createElement("td");
    tdPgasto.textContent = format.separadorDeMiles(
      totales1[0].total_provision_gastos.toString()
    );
    tr2.appendChild(tdPgasto);

    let tdNeto = document.createElement("td");
    tdNeto.textContent = format.separadorDeMiles(
      totales1[0].total_neto_pagar.toString()
    );
    tr3.appendChild(tdNeto);
  }else if(totales1.length == 0 && totales3.length > 0 && impuestos > 0){
    let tdnuevo = document.createElement("td");
    tdnuevo.textContent = format.separadorDeMiles(
      impuestos.toString()
    );
    tr1.appendChild(tdnuevo);

    
    let tdPiva = document.createElement("td");
    tdPiva.textContent = "0";
    tr1.appendChild(tdPiva);

    let tdValor = document.createElement("td");
    tdValor.textContent = format.separadorDeMiles(
      totales3[0].Total_gastos.toString()
    );
    tr2.appendChild(tdValor);

    let tdPgasto = document.createElement("td");
    tdPgasto.textContent = "0";
    tr2.appendChild(tdPgasto);

    let tdNeto = document.createElement("td");
    tdNeto.textContent = "0";
    tr3.appendChild(tdNeto);
  }else if(totales1.length == 0 && totales3.length > 0 && impuestos == 0){
    let tdnuevo = document.createElement("td");
    tdnuevo.textContent = "0";
    tr1.appendChild(tdnuevo);

    
    let tdPiva = document.createElement("td");
    tdPiva.textContent = "0";
    tr1.appendChild(tdPiva);

    let tdValor = document.createElement("td");
    tdValor.textContent = format.separadorDeMiles(
      totales3[0].Total_gastos.toString()
    );
    tr2.appendChild(tdValor);

    let tdPgasto = document.createElement("td");
    tdPgasto.textContent = "0";
    tr2.appendChild(tdPgasto);

    let tdNeto = document.createElement("td");
    tdNeto.textContent = "0";
    tr3.appendChild(tdNeto);
  }else if(totales1.length == 0 && totales3.length == 0 && impuestos > 0){
    let tdnuevo = document.createElement("td");
    tdnuevo.textContent = format.separadorDeMiles(
      impuestos.toString()
    );
    tr1.appendChild(tdnuevo);

    
    let tdPiva = document.createElement("td");
    tdPiva.textContent = "0";
    tr1.appendChild(tdPiva);

    let tdValor = document.createElement("td");
    tdValor.textContent = "0";
    tr2.appendChild(tdValor);

    let tdPgasto = document.createElement("td");
    tdPgasto.textContent = "0";
    tr2.appendChild(tdPgasto);

    let tdNeto = document.createElement("td");
    tdNeto.textContent = "0";
    tr3.appendChild(tdNeto);

  }else if(totales1.length == 0 && totales3.length == 0 && impuestos == 0){
    let tdnuevo = document.createElement("td");
    tdnuevo.textContent = "0";
    tr1.appendChild(tdnuevo);

    
    let tdPiva = document.createElement("td");
    tdPiva.textContent = "0";
    tr1.appendChild(tdPiva);

    let tdValor = document.createElement("td");
    tdValor.textContent = "0";
    tr2.appendChild(tdValor);

    let tdPgasto = document.createElement("td");
    tdPgasto.textContent = "0";
    tr2.appendChild(tdPgasto);

    let tdNeto = document.createElement("td");
    tdNeto.textContent = "0";
    tr3.appendChild(tdNeto);
  }

  cuerpoTabla.appendChild(tr1);
  cuerpoTabla.appendChild(tr2);
  cuerpoTabla.appendChild(tr3);
}

function cargarFecha(
  idInput,
  idCuerpoTabla,
  funcionObtenerTotales1,
  funcionObtenerTotales3
) {
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
  showTable(
    fechaHoy,
    idCuerpoTabla,
    funcionObtenerTotales1,
    funcionObtenerTotales3
  );
  fechaPagosInput.addEventListener("change", () => {
    fechaPagos = fechaPagosInput.value;
    showTable(
      fechaPagos,
      idCuerpoTabla,
      funcionObtenerTotales1,
      funcionObtenerTotales3
    );
    console.log(fechaPagos);
  });
}

async function sumarImpuestos(fecha){
  let impuesto = await  main.ObtenerImpuesto(fecha);
  let total_impuestos = 0;
  if (impuesto.length > 0) {
    impuesto.forEach((impuesto) => {
      for (let propiedad in impuesto) {
          if(propiedad == "valor"){
            total_impuestos = total_impuestos + impuesto[propiedad];
          }
      }
    });
  }
  return total_impuestos;
}


module.exports = {
  cargarFecha,
  showTable,
};
