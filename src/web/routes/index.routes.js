import { Router } from "express";
const indexRouter = new Router()

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

indexRouter.get('/book/:bookId', async (req, res) => {
    const { username, role, userId } = req.session
    const { bookId } = req.params

    const book = await (await fetch(`${apiUrl}/book/${bookId}`)).json()
    const comments = await (await fetch(`${apiUrl}/comment/all?bookId=${bookId}`)).json()

    console.log(book)
    res.render('book',
        {
            title: `Bibliotech - ${book[0].Titulo}`, book, comments,
            user: { username, role, userId }
        }
    )
})

export default indexRouter