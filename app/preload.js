// This file shouldn't need to be touched
const { contextBridge, ipcRenderer } = require('electron/renderer')

// Expose the "newComic" event to the client
contextBridge.exposeInMainWorld('electronAPI', {
    // Expose the 'arucoDetected' event to the client
    arucoDetected: (callback) => ipcRenderer.on('arucoDetected', (_event, markerId) => callback(markerId)),
})