import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import dotenv from 'dotenv/config'

// Configuracion
const width = Number(process.env.WINDOW_WIDTH) || 1600
const height = Number(process.env.WINDOW_HEIGHT) || 900
const webUrl = process.env.WEB_URL

// Funcion para crear la ventana
const createWindow = () => {
    const win = new BrowserWindow({
      width,
      height,
      webPreferences: {
        preload: path.join(process.cwd(), 'src/web/public/js/preload.js')
      }
    })

    win.loadURL(webUrl)
}

// Iniciar la ventana
app.whenReady().then(() => {
    createWindow()

    // Condicion para que no se creen mas de una ventana
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Terminar el proceso de la aplicacion cuando se cierren todas las ventanas
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})