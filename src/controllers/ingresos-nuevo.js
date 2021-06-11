const { remote } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const Swal = require("sweetalert2");
const total = require('../../controllers/total_ingresos');

const buttonIngresarIngreso = document
  .getElementById("ingresar")
  .addEventListener("click", () => {
    insertNewIngreso()
  });

const buttonCancelarIngreso = document
  .getElementById("cancelar")
  .addEventListener("click", () => {
    remote.getCurrentWindow().close();
  });

async function insertNewIngreso() {
  let arrendatario = document.getElementById("arrendatario").value;
  let banco = document.getElementById("banco").value;
  let valor = parseInt(document.getElementById("valor").value);
  let fecha = document.getElementById("fecha").value;

  const ingreso = {
    arrendatario,
    banco,
    valor,
    fecha,
  };
  Swal.fire({
    title: "¿Seguro que quieres agregar este ingreso?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Ingresar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let result = await main.ingresarNuevoIngreso(ingreso);
      let totales_2 = await total.sumatoria(fecha);
      total.insertOrUpdatePago(fecha, totales_2);
      console.log(result);
      Swal.fire("Ingresado", "", "success");
      limpiarFormulario();
    }
  });
}

function limpiarFormulario() {
  document.getElementById("form1").reset();
}
