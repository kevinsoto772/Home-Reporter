redirectToTableWindow();
function redirectToTableWindow(){
    const buttonGoToWork = document.getElementById('button-go-to-work');
    buttonGoToWork.addEventListener('click', ()=>{
        console.log('click')
        let tableWindow = new BrowserWindow({
            resizable: false,
            width: 1000,
            height: 1000,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule:true
            }
        });   
        tableWindow.loadFile("views/pagos/pagos.html");
        remote.getCurrentWindow().close();
    });
}

redirectToTableIngresos();
function redirectToTableIngresos(){
    const buttonGoToIngresos = document.getElementById('button-go-to-ingresos');
    buttonGoToIngresos.addEventListener('click', ()=>{
        console.log('click')
        let tableWindow = new BrowserWindow({
            resizable: false,
            width: 1000,
            height: 1000,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule:true
            }
        });   
        tableWindow.loadFile("views/ingresos/ingresos.html")
    });
    
    document.getElementById("button-go-to-ingresos").addEventListener("click", function (e) {
        let window = remote.getCurrentWindow();
        window.close();
   }); 
}

redirectToTableGastos();
function redirectToTableGastos(){
    const buttonGoToGastos = document.getElementById('button-go-to-gastos');
    buttonGoToGastos.addEventListener('click', ()=>{
        console.log('click')
        let tableWindow = new BrowserWindow({
            resizable: false,
            width: 1000,
            height: 1000,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule:true
            }
        });   
        tableWindow.loadFile("views/gastos/gastos.html")
    });
    
    document.getElementById("button-go-to-gastos").addEventListener("click", function (e) {
        let window = remote.getCurrentWindow();
        window.close();
   }); 
}

redirectToTableCuentas();
function redirectToTableCuentas(){
    const buttonGoToCuentas = document.getElementById('button-go-to-cuentas');
    buttonGoToCuentas.addEventListener('click', ()=>{
        console.log('click')
        let tableWindow = new BrowserWindow({
            resizable: false,
            width: 1000,
            height: 1000,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule:true
            }
        });   
        tableWindow.loadFile("views/cuentas/cuentas.html")
        remote.getCurrentWindow().close();
    }); 
}
function redirectToTablePagosNuevos(){
        let tableWindow = new BrowserWindow({
            resizable: false,
            width: 900,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule:true
            }
        });   
        tableWindow.loadFile("views/pagos-nuevo/pagos-nuevo.html")
}

function redirectToTableIngresosNuevos(){
    let tableWindow = new BrowserWindow({
        resizable: false,
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule:true
        }
    });   
    tableWindow.loadFile("views/ingresos-nuevo/ingreso-nuevo.html")
}

function redirectToTableGastosNuevos(){
    let tableWindow = new BrowserWindow({
        resizable: false,
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule:true
        }
    });   
    tableWindow.loadFile("views/gastos-nuevo/gastos-nuevo.html")
}

redirectToReportes();
function redirectToReportes(){
    const buttonGoToReporte = document.getElementById('button-go-to-reporte');
    buttonGoToReporte.addEventListener('click', ()=>{
        console.log('click')
        let tableWindow = new BrowserWindow({
            resizable: false,
            width: 1000,
            height: 1000,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule:true
            }
        });   
        tableWindow.loadFile("views/Reporte/reporte.html")
    });
    
    document.getElementById("button-go-to-reporte").addEventListener("click", function (e) {
        let window = remote.getCurrentWindow();
        window.close();
   }); 
}
