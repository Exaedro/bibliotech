import { Router } from "express";
const indexRouter = new Router()

// Funcion para saber si el usuario esta logeado
import { isLogged } from "../utils/auth.js";

// Funcion para permitir el uso de la api en el localhost:4000
import { corsMiddleware } from "../middlewares/cors.js";

// URL de la api
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

indexRouter.get('/', async (req, res) => {
    const { username, role, userId } = req.session

    const recents = await (await fetch(`${apiUrl}/book/recent`)).json()
    const mostLiked = await (await fetch(`${apiUrl}/book/liked`)).json()
    const mostVisited = await (await fetch(`${apiUrl}/book/visited`)).json()

    res.render('index',
        {
            title: 'Bibliotech - Inicio', recents, mostLiked, mostVisited,
            user: {
                username, role, userId
            }
        }
    )
})

indexRouter.get('/catalog', async (req, res) => {
    const { username, role, userId } = req.session
    const { genre, title } = req.query

    let books
    if (genre) {
        books = await (await fetch(`${apiUrl}/book/all?genre=${genre}`)).json()
    } else {
        books = await (await fetch(`${apiUrl}/book/all`)).json()
    }

    if (title) {
        books = await (await fetch(`${apiUrl}/book/all?title=${title}`)).json()
    } else {
        books = await (await fetch(`${apiUrl}/book/all`)).json()
    }

    const categories = await (await fetch(`${apiUrl}/book/categories`)).json()

    res.render('catalog',
        {
            title: 'Bibliotech - Catalogo', books, categories,
            user: { username, role, userId }
        }
    )
})

indexRouter.get('/profile', isLogged, async (req, res) => {
    const { username, role, userId } = req.session

    corsMiddleware(res, 'http://localhost:4000')

    const likedBooks = await (await fetch(`${apiUrl}/user/like/all`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })).json()

    const favoriteBooks = await (await fetch(`${apiUrl}/user/favorite/all`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })).json()

    const seeLaterBooks = await (await fetch(`${apiUrl}/user/later/all`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })).json()

    res.render('profile',
        {
            title: 'Bibliotech - Perfil', likedBooks, favoriteBooks, seeLaterBooks,
            user: { username, role, userId }
        }
    )
})

indexRouter.get('/book/:bookId', async (req, res) => {
    const { username, role, userId } = req.session
    const { bookId } = req.params

    corsMiddleware(res, 'http://localhost:4000')

    const book = await (await fetch(`${apiUrl}/book/${bookId}`)).json()
    const comments = await (await fetch(`${apiUrl}/comment/all?bookId=${bookId}`)).json()

    res.render('book',
        {
            title: `Bibliotech - ${book.Titulo}`, book, comments,
            user: { username, role, userId }
        }
    )
})

indexRouter.get('/login', async (req, res) => {
    const { error } = req.query

    res.render('login',
        {
            title: "Bibliotech - Iniciar sesión", error
        }
    )
})
indexRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const response = await fetch(`${apiUrl}/user/login`,
        {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }
    )

    const user = await response.json()

    if (!response.ok)
        return res.redirect(`/login?error=${user.error}`)

    req.session.userId = user[0].id
    req.session.username = user[0].username
    req.session.role = user[0].role

    res.redirect('/')
})

indexRouter.get('/register', async (req, res) => {
    res.render('register',
        {
            title: 'Bibliotech - Registro'
        }
    )
})
indexRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const response = await fetch(`${apiUrl}/user/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        }
    )

    const user = await response.json()

    if (!response.ok)
        return res.status(404).redirect('/register')

    res.status(200).redirect('/login')
})

export default indexRouter