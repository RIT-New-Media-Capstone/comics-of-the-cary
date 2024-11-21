const { app, BrowserWindow } = require('electron/main');

let mainWindow;

// creates the window & makes the index.html file display on it
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 405,
        height: 720,
        //autoHideMenuBar: true
    })

    // begin by loading the index.html file into the window
    mainWindow.loadFile('./client/scanned.html');
}

// take as much time as you need, show window when ready
app.whenReady().then(() => {
    createWindow();
})

// terminate the app if the window is closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})