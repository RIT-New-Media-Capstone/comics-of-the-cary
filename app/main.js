const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');

let mainWindow;

// HI MAX
// whenever you scan a new comic, call this function with the comic's
// name. It will tell the client that a new comic was scanned.
const sendComicNameToClient = (comicName) => {
    mainWindow.webContents.send('newComic', comicName);
};

// creates the window & makes the index.html file display on it
const createWindow = () => {
    mainWindow = new BrowserWindow({
        // This section is for exposing functions in electron to the client JS
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        width: 1024,
        height: 576,
        //autoHideMenuBar: true
    })

    // begin by loading the index.html file into the window
    mainWindow.loadFile('./client/index.html');

    // REMOVE THIS
    setTimeout(() => {sendComicNameToClient("hey yall scott here");}, 3000);
}

// take as much time as you need, show window when ready
app.whenReady().then(() => {
    createWindow();
})

// terminate the app if the window is closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})