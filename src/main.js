/* ----------------REQUIRES---------------------*/
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const { electron } = require("process");
/* ----------------REQUIRES---------------------*/

/* -----------LISTENER DE CAMBIOS ---------*/
require("electron-reload")(__dirname, {});
/* -----------LISTENER DE CAMBIOS ---------*/

/*-------- BASE DE DATOS - CONEXION--------- */
require("./database");
let { obtenerConeccion } = require("./database");
/*-------- BASE DE DATOS - CONEXION -------*/

if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electro: path.join(__dirname, "../node_modules", "bin", "electron"),
  });
}

let mainWindow;
//
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    resizable: false,
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadFile("views/index.html");
  /* mainWindow.setMenu(null) */
});

/* ---------------------------------------- SQL ------------------------------- */
/* ------------------------------------------------------------------------------- */

async function ingresarNuevoPago(pago) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("INSERT INTO pagos SET ?", pago);
  console.log(resultado);
  return resultado;
}
async function ingresarNuevoIngreso(ingreso) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "INSERT INTO ingresos SET ?",
    ingreso
  );
  console.log(resultado);
  return resultado;
}

async function ingresarNuevoGasto(gasto) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("INSERT INTO gastos SET ?", gasto);
  console.log(resultado);
return resultado;
}

async function obtenerPagos(fecha) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "SELECT * FROM pagos WHERE fecha = ?",
    [fecha]
  );
  return resultado;
}

async function obtenerIngresos(fecha) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "SELECT * FROM ingresos WHERE fecha = ?",
    [fecha]
  );
  return resultado;
}

async function obtenerGastos(fecha) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "SELECT * FROM gastos WHERE fecha = ?",
    [fecha]
  );
  return resultado;
}

async function obtenerPago(id) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "SELECT * FROM pagos WHERE id_pagos = ?",
    [id]
  );
  return resultado;
}

async function eliminarPago(id) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "DELETE FROM pagos WHERE id_pagos = ?",
    [id]
  );
  return resultado;
}

async function actualizarPago(id, pago) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "UPDATE pagos SET ? WHERE id_pagos = ?",
    [pago, id]
  );
  return resultado;
}

async function obtenerIngreso(id) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "SELECT * FROM ingresos WHERE id_ingresos = ?",
    [id]
  );
  return resultado;
}

async function eliminarIngreso(id) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "DELETE FROM ingresos WHERE id_ingresos = ?",
    [id]
  );
  return resultado;
}

async function actualizarIngreso(id, ingreso) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "UPDATE ingresos SET ? WHERE id_ingresos = ?",
    [ingreso, id]
  );
  return resultado;
}

async function obtenerGasto(id) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "SELECT * FROM gastos WHERE id_gastos = ?",
    [id]
  );
  return resultado;
}

async function eliminarGasto(id) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "DELETE FROM gastos WHERE id_gastos = ?",
    [id]
  );
  return resultado;
}

async function actualizarGasto(id, gasto) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query(
    "UPDATE gastos SET ? WHERE id_gastos = ?",
    [gasto, id]
  );
  return resultado;
}


async function obtenerTotales1(fecha) {
  console.log('Se ejecuta SQL');
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("SELECT * FROM totales_1 WHERE fecha = ?", fecha);
  return resultado;
}

async function ingresarTotales1(totales_1) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("INSERT INTO totales_1 SET ?", totales_1);
  return resultado;
}

async function actualizarTotales1(id, totales_1) {
  console.log('Se ejecuta SQL');
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("UPDATE totales_1 SET ? WHERE id_totales_1 = ?", [totales_1, id]);
  return resultado;
}

async function obtenerTotales2(fecha) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("SELECT * FROM totales_2 WHERE fecha = ?", fecha);
  return resultado;
}

async function ingresarTotales2(totales_2) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("INSERT INTO totales_2 SET ?", totales_2);
  return resultado;
}

async function actualizarTotales2(id, totales_2) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("UPDATE totales_2 SET ? WHERE id_Totales_2 = ?", [totales_2, id]);
  return resultado;
}

async function obtenerTotales3(fecha) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("SELECT * FROM totales_3 WHERE fecha = ?", fecha);
  return resultado;
}

async function ingresarTotales3(totales_3) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("INSERT INTO totales_3 SET ?", totales_3);
  return resultado;
}

async function actualizarTotales3(id, totales_3) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("UPDATE totales_3 SET ? WHERE id_Totales_3 = ?", [totales_3, id]);
  return resultado;
}

async function ObtenerImpuesto(fecha) {
  const conexion = obtenerConeccion();
  const resultado = (await conexion).query("SELECT * FROM gastos WHERE impuesto = 1 && fecha = ?", fecha);
  return resultado;
}

// Crear funcion que obtenga totales por dia

// Definir una funcion que obtenga todos los pagos y haga la sumatoria y guarde el valor dentro de total pagos en la fecha correspondiente
module.exports = {
  ingresarNuevoPago,
  ingresarNuevoIngreso,
  ingresarNuevoGasto,
  obtenerPagos,
  obtenerIngresos,
  obtenerGastos,
  obtenerPago,
  eliminarPago,
  actualizarPago,
  obtenerIngreso,
  eliminarIngreso,
  actualizarIngreso,
  obtenerGasto,
  eliminarGasto,
  actualizarGasto,
  obtenerTotales1,
  ingresarTotales1,
  actualizarTotales1,
  obtenerTotales2,
  ingresarTotales2,
  actualizarTotales2,
  obtenerTotales3,
  ingresarTotales3,
  actualizarTotales3,
  ObtenerImpuesto
};
