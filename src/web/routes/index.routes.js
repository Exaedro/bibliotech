import { Router } from "express";
const indexRouter = new Router()

// URL de la api
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

indexRouter.get('/', async (req, res) => {
    const { username, role, userId } = req.session

    const recents = await (await fetch(`${apiUrl}/books/recent`)).json()
    const mostLiked = await (await fetch(`${apiUrl}/books/liked`)).json()
    const mostVisited = await (await fetch(`${apiUrl}/books/visited`)).json()

    const userRecord = await (await fetch(`${apiUrl}/user/record/${userId}`)).json()

    res.render('index',
        {
            title: 'Bibliotech - Inicio', recents, mostLiked, mostVisited, userRecord: userRecord.data,
            user: {
                username, role, userId
            }
        }
    )
})

indexRouter.get('/error', async (req, res) => {
    const { username, role, userId } = req.session

    res.render('error',
        {
            title: 'Bibliotech - Error', 
            user: {
                username, role, userId
            }
        }
    )
})

indexRouter.get('/catalog', async (req, res) => {
    const { username, role, userId } = req.session
    let { title, genre, author, date, isbn, pages, language, publisher } = req.query
    
    title = title ? title : ''
    author = author ? author : ''
    date = date ? date : ''
    isbn = isbn ? isbn : ''
    pages = pages ? pages : ''
    language = language ? language : ''
    publisher = publisher ? publisher : ''

    if(genre == 'off' || genre == undefined)
        genre = ''

    let books = await (await fetch(`${apiUrl}/books/search?title=${title}&author=${author}&date=${date}&genre=${genre}&isbn=${isbn}&pages=${pages}&language=${language}&publisher=${publisher}`)).json()

    const categories = await (await fetch(`${apiUrl}/books/categories`)).json()

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
    const { format } = res.locals

    const book = await (await fetch(`${apiUrl}/book/${bookId}`, { method: 'GET' })).json()

    if(book.error) {
        return res.redirect('/error')
    }

    const comments = await (await fetch(`${apiUrl}/comments?bookId=${bookId}`)).json()

    if(userId) {
        const response = await fetch(`${apiUrl}/user/record/add`, 
            { 
                method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, bookId: book[0].id }) 
            }
        )
    }

    res.render('book',
        {
            title: `Bibliotech - ${book[0].title}`, book, comments, format,
            user: { username, role, userId }
        }
    )
})

export default indexRouter