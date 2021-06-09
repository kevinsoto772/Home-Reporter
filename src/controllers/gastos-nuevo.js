const { remote } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const Swal = require("sweetalert2");
const total = require('../../controllers/total_gastos');

const buttonIngresarGasto = document
  .getElementById("ingresar")
  .addEventListener("click", () => {
    insertNewGasto()
  });

const buttonCancelarGasto = document
  .getElementById("cancelar")
  .addEventListener("click", () => {
    remote.getCurrentWindow().close();
  });

  async function insertNewGasto() {
    let nombre = document.getElementById("nombre").value;
    let concepto = document.getElementById("concepto").value;
    let impuesto = document.getElementById("opcion_impuesto").value
    let valor = parseInt(document.getElementById("valor").value);
    let fecha = document.getElementById("fecha").value;
  
    const gasto = {
      nombre,
      concepto,
      impuesto,
      valor,
      fecha,
    };
    
    Swal.fire({
      title: "¿Seguro que quieres agregar este gasto?",
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: `Ingresar`,
      confirmButtonColor: "#292A2D",
      cancelButtonColor: "rgb(179, 46, 46)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await main.ingresarNuevoGasto(gasto);
        let totales_3 = await total.sumatoria(fecha);
      total.insertOrUpdatePago(fecha, totales_3);
    console.log(result);
    console.log(impuesto);
        Swal.fire("Ingresado", "", "success");
        limpiarFormulario();
      }
    });

    
  }
  

  function limpiarFormulario() {
    document.getElementById("form1").reset();
  }