import { Router } from "express";
const panelRouter = new Router()

// Funcion para saber si el usuario esta logeado
import { isAdmin } from '../utils/auth.js'

// URL de la API de la biblioteca
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

// En todas las rutas despues de /panel se verificara si el usuario es un administrador o no
panelRouter.get('/panel*', isAdmin)

export default panelRouter