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

    const userRecord = await (await fetch(`${apiUrl}/user/record/${userId}`)).json()

    res.render('index',
        {
            title: 'Bibliotech - Inicio', recents, mostLiked, mostVisited, userRecord,
            user: {
                username, role, userId
            }
        }
    )
})

indexRouter.get('/catalog', async (req, res) => {
    const { username, role, userId } = req.session
    let { title, genre, author, date } = req.query
    
    title = title ? title : ''
    author = author ? author : ''
    date = date ? date : ''

    if(genre == 'off' || genre == undefined)
        genre = ''

    let books = await (await fetch(`${apiUrl}/book/search?title=${title}&author=${author}&date=${date}&genre=${genre}`)).json()

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

    if(userId) {
        const response = await fetch(`${apiUrl}/user/record/add`, 
            { 
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, bookId: book[0].LibroID }) 
            }
        )
    }

    res.render('book',
        {
            title: `Bibliotech - ${book[0].Titulo}`, book, comments,
            user: { username, role, userId }
        }
    )
})

export default indexRouter