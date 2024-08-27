import { Router } from "express";
const profileRouter = new Router()

// Funcion para saber si el usuario esta logeado
import { isLogged } from "../utils/auth.js";

// URL de la api
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

// En todas las rutas despues de /profile se verificara si el usuario ha iniciado sesion o no
profileRouter.get('/profile*', isLogged)

profileRouter.get('/profile', async (req, res) => {
    const { username, role, userId } = req.session

    const likedBooks = await (await fetch(`${apiUrl}/user/like/all?userId=${userId}`, { method: 'GET' })).json()
    const favoriteBooks = await (await fetch(`${apiUrl}/user/favorite/all?userId=${userId}`, { method: 'GET' })).json()
    const seeLaterBooks = await (await fetch(`${apiUrl}/user/later/all?userId=${userId}`, { method: 'GET' })).json()

    res.render('profile',
        {
            title: 'Bibliotech - Perfil', likedBooks, favoriteBooks, seeLaterBooks,
            user: { username, role, userId }
        }
    )
})

profileRouter.get('/profile/like', async (req, res) => {
    const { username, role, userId } = req.session

    const books = await (await fetch(apiUrl + '/user/like/all?userId=' + userId, { method: 'GET' })).json()

    res.render('profile/liked', 
        {
            title: 'Bibliotech - Mis gustados', books,
            user: { username, role, userId }
        }
    )
})

profileRouter.get('/profile/favorite', async (req, res) => {
    const { username, role, userId } = req.session

    const books = await (await fetch(apiUrl + '/user/favorite/all?userId=' + userId, { method: 'GET' })).json()

    res.render('profile/favorites', 
        {
            title: 'Bibliotech - Mis favoritos', books,
            user: { username, role, userId }
        }
    )
})

profileRouter.get('/profile/see-later', async (req, res) => {
    const { username, role, userId } = req.session

    const books = await (await fetch(apiUrl + '/user/later/all?userId=' + userId, { method: 'GET' })).json()

    res.render('profile/seeLater', 
        {
            title: 'Bibliotech - Leer mas tarde', books,
            user: { username, role, userId }
        }
    )
})

export default profileRouter