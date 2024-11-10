// This file shouldn't need to be touched
const { contextBridge, ipcRenderer } = require('electron/renderer')

// Expose the "newComic" event to the client
contextBridge.exposeInMainWorld('electronAPI', {
    newComic: (callback) => ipcRenderer.on('newComic', (_event, comicName) => callback(comicName)),
})