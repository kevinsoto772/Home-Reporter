const { remote, ipcRenderer } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const Swal = require("sweetalert2");
const total = require("../../controllers/total_gastos");

let idAManipular; //coment
let nombre = document.getElementById("nombre");
let valor = document.getElementById("valor");
let concepto = document.getElementById("concepto");
let impuesto = document.getElementById("opcion_impuesto");
let fecha = document.getElementById("fecha");

const buttonEliminarGasto = document.getElementById("eliminar");
buttonEliminarGasto.addEventListener("click", () => {
  borrarGasto(idAManipular);
});

ipcRenderer.on("registro", (event, info) => {
  const buttonUpdateGasto = document.getElementById("actualizar");
  buttonUpdateGasto.addEventListener("click", () => {
    const gasto = {
      nombre: nombre.value,
      concepto: concepto.value,
      impuesto: impuesto.value,
      valor: valor.value,
      fecha: fecha.value,
    };
    ActualizarGasto(idAManipular, gasto);
  });

  console.log(info);
  idAManipular = info;
  console.log("idAmManipular", idAManipular);
  conseguirGasto(idAManipular);
});

async function conseguirGasto(idAManipular) {
  let gasto = await main.obtenerGasto(idAManipular);
  console.log(gasto);

  nombre.value = gasto[0].nombre;
  valor.value = gasto[0].valor;
  concepto.value = gasto[0].concepto;
  impuesto.value = gasto[0].impuesto;

  let day = gasto[0].fecha.getDate();
  let month = gasto[0].fecha.getMonth() + 1;
  let year = gasto[0].fecha.getFullYear();

  if (day < 10) {
    fecha.value = `${year}-0${month}-0${day}`;
  } else if (month < 10) {
    fecha.value = `${year}-0${month}-${day}`;
  } else fecha.value = `${year}-${month}-${day}`;
}

async function ActualizarGasto(idAManipular, gasto) {
  Swal.fire({
    title: "¿Seguro que quieres actualizar este gasto?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Actualizar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let actualizacion = await main.actualizarGasto(idAManipular, gasto);
      let totales_3 = await total.sumatoria(fecha.value);
      total.insertOrUpdatePago(fecha.value, totales_3);
      Swal.fire("Actualizado", "", "success");
      limpiarFormulario();
    }
  });
}

async function borrarGasto(idAManipular) {
  Swal.fire({
    title: "¿Seguro que quieres eliminar este gasto?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Eliminar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let resultado = await main.eliminarGasto(idAManipular);
      let totales_3 = await total.sumatoria(fecha.value);
      total.insertOrUpdatePago(fecha.value, totales_3);
      console.log(resultado);
      Swal.fire("Eliminado", "", "success");
      limpiarFormulario();
    }
  });
}

function limpiarFormulario() {
  document.getElementById("form1").reset();
}
