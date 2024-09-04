import { Router } from "express";
const profileRouter = new Router()

// Funcion para saber si el usuario esta logeado
import { isLogged } from "../utils/auth.js";

// URL de la api
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

// En todas las rutas despues de /profile se verificara si el usuario ha iniciado sesion o no
// profileRouter.get('/profile*', isLogged)

profileRouter.get('/profile/:id', async (req, res) => {
    const { username, email ,role, userId, image } = req.session
    const { id } = req.params

    const user = await (await fetch(`${apiUrl}/user/data/${id}`, { method: 'GET' })).json()

    if(user.error == 'user_not_exists')
        return res.redirect('/error')
    
    const likedBooks = await (await fetch(`${apiUrl}/user/like/all?userId=${id}`, { method: 'GET' })).json()
    const favoriteBooks = await (await fetch(`${apiUrl}/user/favorite/all?userId=${id}`, { method: 'GET' })).json()
    const seeLaterBooks = await (await fetch(`${apiUrl}/user/later/all?userId=${id}`, { method: 'GET' })).json()
    
    res.render('profile',
        {
            title: 'Bibliotech - Perfil', likedBooks, favoriteBooks, seeLaterBooks,
            user: { username, email, role, userId, image },
            userProfile: { id: user.id, email: user.email, username: user.username, image: user.image, role: user.roleId }
        }
    )
})

profileRouter.get('/profile/myself/edit', async (req, res) => {
    const { username, role, userId } = req.session

    const data = await (await fetch(`${apiUrl}/user/data/${userId}`, { method: 'GET' })).json()

    res.render('profile/edit', 
        {
            title: 'Bibliotech - Editar usuario',
            user: { username, role, userId },
            data
        }
    )
})

profileRouter.post('/profile/edit', async (req, res) => {
    const { userId } = req.session
    const { username, email } = req.body
    const file = req.file

    const { actualPassword, newPassword, confirmPassword } = req.body

    if(newPassword != confirmPassword)
        return res.redirect('/profile/edit?error="password_not_match"')

    if(actualPassword != undefined) {
        const isPasswordValid = await fetch(`${apiUrl}/user/password`, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                userId,
                password: actualPassword
            })
        })
    
        if(!isPasswordValid.ok && (newPassword == undefined || actualPassword == undefined || confirmPassword == undefined))
            return res.redirect('/profile/edit?error="invalid_password"')
    }

    const object = {
        userId,
        username, 
        email,
        password: newPassword,
    }

    if(file)
        object.avatar = '/uploads/' + file.filename

    const response = await fetch(`${apiUrl}/user/edit`, {
        method: 'POST',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(object)
    })

    const user = await response.json()

    if(!response.ok) {
        console.error(user.error)
        return res.redirect('/profile/edit')
    }
        
    req.session.username = user.data.username

    return res.redirect('/profile')
})

profileRouter.get('/profile/:id/like', async (req, res) => {
    const { username, role, userId, image } = req.session
    const { id } = req.params

    // ! AGREGAR ERRORES MAS TARDE
    const user = await (await fetch(`${apiUrl}/user/data/${id}`, { method: 'GET' })).json()
    if(user.error == 'user_not_exists')
        return res.redirect('/error')

    const books = await (await fetch(apiUrl + '/user/like/all?userId=' + id, { method: 'GET' })).json()

    res.render('profile/liked', 
        {
            title: 'Bibliotech - Mis gustados', books,
            user: { username, role, userId, image },
            userProfile: { id: user.id, username: user.username, image: user.image  }
        }
    )
})

profileRouter.get('/profile/:id/favorite', async (req, res) => {
    const { username, role, userId, image } = req.session
    const { id } = req.params

    const user = await (await fetch(`${apiUrl}/user/data/${id}`, { method: 'GET' })).json()
    if(user.error == 'user_not_exists')
        return res.redirect('/error')

    const books = await (await fetch(apiUrl + '/user/favorite/all?userId=' + id, { method: 'GET' })).json()

    res.render('profile/favorites', 
        {
            title: 'Bibliotech - Mis favoritos', books,
            user: { username, role, userId, image },
            userProfile: { id: user.id, username: user.username, image: user.image  }
        }
    )
})

profileRouter.get('/profile/:id/see-later', async (req, res) => {
    const { username, role, userId, image } = req.session
    const { id } = req.params

    const user = await (await fetch(`${apiUrl}/user/data/${id}`, { method: 'GET' })).json()
    if(user.error == 'user_not_exists')
        return res.redirect('/error')

    const books = await (await fetch(apiUrl + '/user/later/all?userId=' + id, { method: 'GET' })).json()

    res.render('profile/seeLater', 
        {
            title: 'Bibliotech - Leer mas tarde', books,
            user: { username, role, userId, image },
            userProfile: { id: user.id, username: user.username, image: user.image }
        }
    )
})

export default profileRouter