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

    const user = await (await fetch(`${apiUrl}/user/${id}`, { method: 'GET' })).json()

    if(user.message?.includes('not'))
        return res.redirect('/error?message=not_found')
    
    const likedBooks = await (await fetch(`${apiUrl}/user/${id}/like/all`, { method: 'GET' })).json()
    const favoriteBooks = await (await fetch(`${apiUrl}/user/${id}/favorite/all`, { method: 'GET' })).json()
    const seeLaterBooks = await (await fetch(`${apiUrl}/user/${id}/later/all`, { method: 'GET' })).json()

    let userBooks
    if(user.author) {
        userBooks = await (await fetch(`${apiUrl}/user/${user.id}/books`, { method: 'GET' })).json()
    }

    console.log(userBooks)
    
    res.render('profile',
        {
            title: 'Bibliotech - Perfil', likedBooks: likedBooks.books, favoriteBooks: favoriteBooks.books, seeLaterBooks: seeLaterBooks.books, userBooks,
            user: { username, email, role, userId, image },
            userProfile: { id: user.id, email: user.email, username: user.username, image: user.image, role: user.roleId }
        }
    )
})

profileRouter.get('/profile/myself/edit', async (req, res) => {
    const { username, role, userId } = req.session

    const user = await (await fetch(`${apiUrl}/user/${userId}`, { method: 'GET' })).json()

    res.render('profile/edit', 
        {
            title: 'Bibliotech - Editar usuario',
            user: { username, role, userId },
            userProfile: {...user }
        }
    )
})

profileRouter.get('/profile/:id/edit', async (req, res) => {
    const { username, role, userId } = req.session
    const { id } = req.params

    const user = await (await fetch(`${apiUrl}/user/${id}`, { method: 'GET' })).json()

    if(user.error == 'user_not_exists')
        return res.redirect('/error?message=not_found')

    res.render('profile/edit', 
        {
            title: 'Bibliotech - Editar usuario',
            user: { username, role, userId },
            userProfile: { id: user.id, username: user.username, image: user.image, email: user.email }
        }
    )
})

profileRouter.post('/profile/edit', async (req, res) => {
    const { userId } = req.session
    const { username, email } = req.body
    const file = req.files[0]

    const { actualPassword, newPassword, confirmPassword } = req.body

    if(newPassword != confirmPassword)
        return res.redirect('/profile/myself/edit?error=password_not_match')

    if(actualPassword != '') {
        if(newPassword == '' || confirmPassword == '') {
            return res.redirect('/profile/myself/edit?error=password_fields_required')
        }

        const response = await fetch(`${apiUrl}/users/password`, {
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
        
        const isPasswordValid = await response.json()

        if(!isPasswordValid.valid)
            return res.redirect('/profile/myself/edit?error=invalid_password')
    }

    let object = {
        id: userId,
        username, 
        email,
        password: newPassword,
    }

    if(file.length > 0)
        object.avatar = '/uploads/' + file.filename

    const response = await fetch(`${apiUrl}/users/edit`, {
        method: 'POST',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(object)
    })

    const user = await response.json()

    if(!response.ok) {
        return res.redirect('/profile/myself/edit')
    }
        
    req.destroy()
    return res.redirect('/login') 
})

profileRouter.get('/profile/:id/like', async (req, res) => {
    const { username, role, userId, image } = req.session
    const { id } = req.params

    // ! AGREGAR ERRORES MAS TARDE
    const user = await (await fetch(`${apiUrl}/user/${id}`, { method: 'GET' })).json()
    if(user.error == 'user_not_exists')
        return res.redirect('/error?message=not_found')

    const data = await (await fetch(apiUrl + `/user/${id}/like/all`, { method: 'GET' })).json()

    res.render('profile/liked', 
        {
            title: 'Bibliotech - Mis gustados', books: data.books,
            user: { username, role, userId, image },
            userProfile: { id: user.id, username: user.username, image: user.image  }
        }
    )
})

profileRouter.get('/profile/:id/favorite', async (req, res) => {
    const { username, role, userId, image } = req.session
    const { id } = req.params

    const user = await (await fetch(`${apiUrl}/user/${id}`, { method: 'GET' })).json()
    if(user.error == 'user_not_exists')
        return res.redirect('/error?message=not_found')

    const data = await (await fetch(apiUrl + `/user/${id}/favorite/all`, { method: 'GET' })).json()

    res.render('profile/favorites', 
        {
            title: 'Bibliotech - Mis favoritos', books: data.books,
            user: { username, role, userId, image },
            userProfile: { id: user.id, username: user.username, image: user.image  }
        }
    )
})

profileRouter.get('/profile/:id/see-later', async (req, res) => {
    const { username, role, userId, image } = req.session
    const { id } = req.params

    const user = await (await fetch(`${apiUrl}/user/${id}`, { method: 'GET' })).json()
    if(user.error == 'user_not_exists')
        return res.redirect('/error?message=not_found')

    const data = await (await fetch(apiUrl + `/user/${id}/later/all`, { method: 'GET' })).json()

    res.render('profile/seeLater', 
        {
            title: 'Bibliotech - Leer mas tarde', books: data.books,
            user: { username, role, userId, image },
            userProfile: { id: user.id, username: user.username, image: user.image }
        }
    )
})

profileRouter.get('/profile/myself/record', isLogged, async (req, res) => {
    const { username, role, userId } = req.session

    const books = await (await fetch(apiUrl + `/user/record/${userId}?limit=10000`)).json()

    res.render('profile/record', 
        {
            title: 'Bibliotech - Historial', books: books.data,
            user: { username, role, userId }
        }
    )
})

export default profileRouter