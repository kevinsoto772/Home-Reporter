const {remote} = require('electron');
const main = remote.require('./main.js')
const BrowserWindow = remote.BrowserWindow

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


