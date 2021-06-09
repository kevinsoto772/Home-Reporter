const { remote, ipcRenderer } = require("electron");
const main = remote.require("./main.js");
const BrowserWindow = remote.BrowserWindow;
const Swal = require("sweetalert2");
const total = require("../../controllers/total_ingresos");

let idAManipular; //coment
let arrendatario = document.getElementById("nombre");
let valor = document.getElementById("valor");
let banco = document.getElementById("banco");
let fecha = document.getElementById("fecha");

const buttonEliminarIngreso = document.getElementById("eliminar");
buttonEliminarIngreso.addEventListener("click", () => {
  borrarIngreso(idAManipular);
});

ipcRenderer.on("registro", (event, info) => {
  const buttonUpdateIngreso = document.getElementById("actualizar");
  buttonUpdateIngreso.addEventListener("click", () => {
    const ingreso = {
      arrendatario: arrendatario.value,
      banco: banco.value,
      valor: valor.value,
      fecha: fecha.value,
    };
    ActualizarIngreso(idAManipular, ingreso);
  });

  console.log(info);
  idAManipular = info;
  console.log("idAmManipular", idAManipular);

  conseguirIngreso(idAManipular);
});

async function conseguirIngreso(idAManipular) {
  let ingreso = await main.obtenerIngreso(idAManipular);
  console.log(ingreso);

  arrendatario.value = ingreso[0].arrendatario;
  valor.value = ingreso[0].valor;
  banco.value = ingreso[0].banco;

  let day = ingreso[0].fecha.getDate();
  let month = ingreso[0].fecha.getMonth() + 1;
  let year = ingreso[0].fecha.getFullYear();

  if (day < 10) {
    fecha.value = `${year}-0${month}-0${day}`;
  } else if (month < 10) {
    fecha.value = `${year}-0${month}-${day}`;
  } else fecha.value = `${year}-${month}-${day}`;
}

async function ActualizarIngreso(idAManipular, ingreso) {
  Swal.fire({
    title: "¿Seguro que quieres actualizar este ingreso?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Actualizar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let actualizacion = await main.actualizarIngreso(idAManipular, ingreso);
      let totales_2 = await total.sumatoria(fecha.value);
      total.insertOrUpdatePago(fecha.value, totales_2);
      console.log(actualizacion);
      Swal.fire("Actualizado", "", "success");
      limpiarFormulario();
    }
  });
}

async function borrarIngreso(idAManipular) {
  Swal.fire({
    title: "¿Seguro que quieres eliminar este ingreso?",
    showCancelButton: true,
    cancelButtonText: "cancelar",
    confirmButtonText: `Eliminar`,
    confirmButtonColor: "#292A2D",
    cancelButtonColor: "rgb(179, 46, 46)",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let resultado = await main.eliminarIngreso(idAManipular);
      let totales_2 = await total.sumatoria(fecha.value);
      total.insertOrUpdatePago(fecha.value, totales_2);
      console.log(resultado);
      Swal.fire("Eliminado", "", "success");
      limpiarFormulario();
    }
  });
}

function limpiarFormulario() {
  document.getElementById("form1").reset();
}
