const {remote} = require('electron');
const main = remote.require('./main.js')
const BrowserWindow = remote.BrowserWindow
const table = require('../../utils/table_cuentas');

table.cargarFecha('fecha-cuenta','cuerpo-tabla-cuentas',main.obtenerTotales1,main.obtenerTotales3);



