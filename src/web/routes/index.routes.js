import { Router } from "express";
const indexRouter = new Router()

// Socket
import { io } from '../index.js'

import Email from "../utils/sendEmail.js";

// Validadores
import { validationResult } from "express-validator";
import { authorRequestValidator } from "../utils/validators.js";

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

    // Mensaje de error
    const { message } = req.query

    res.render('error',
        {
            title: 'Bibliotech - Error', message,
            user: {
                username, role, userId
            }
        }
    )
})

indexRouter.get('/catalog', async (req, res) => {
    const { username, role, userId, autor } = req.session
    let { title, genre, author, date, isbn, pages, language, publisher, page, type } = req.query
    
    title = title ? title : ''
    author = author ? author : ''
    date = date ? date : ''
    isbn = isbn ? isbn : ''
    pages = pages ? pages : ''
    language = language ? language : ''
    publisher = publisher ? publisher : ''
    page = page ? page : 0
    
    if(genre == 'off' || genre == undefined)
        genre = ''
    
    let data
    if(Object.keys(req.query).length <= 0 || (req.query.page && Object.keys(req.query).length == 1)) {
        data = await (await fetch(`${apiUrl}/books?page=${page}`)).json()
    } else {
        data = await (await fetch(`${apiUrl}/books/search?title=${title}&author=${author}&date=${date}&genre=${genre}&isbn=${isbn}&pages=${pages}&language=${language}&publisher=${publisher}&page=${page}&type=${type}`)).json()
    }
    
    let isAuthor = false
    if(userId) {
        const user = await (await fetch(`${apiUrl}/user/${userId}`)).json()
        isAuthor = user.author ? true : false
    }
    
    const categories = await (await fetch(`${apiUrl}/books/categories`)).json()

    res.render('catalog',
        {
            title: 'Bibliotech - Catalogo', books: data.books, categories, booksCount: data.data.totalBooks, pageSelected: page,
            user: { username, role, userId, autor: isAuthor }
        }
    )
})

indexRouter.get('/book/:bookId', async (req, res) => {
    const { username, role, userId } = req.session
    const { bookId } = req.params
    const { format } = res.locals

    const book = await (await fetch(`${apiUrl}/book/${bookId}`, { method: 'GET' })).json()

    if(book.error) {
        return res.redirect('/error?message=not_found')
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

    // Si el libro es original y tiene capitulos disponibles
    const chapters = await (await fetch(`${apiUrl}/manga/${book[0].id}/chapters`, { method: 'GET' })).json()

    res.render('book',
        {
            title: `Bibliotech - ${book[0].title}`, book, comments, chapters, format,
            user: { username, role, userId }
        }
    )

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipReal = ip === '::1' ? '8.8.8.8' : ip;

    const response = await fetch(`${apiUrl}/book/add/visit`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: book[0].id, ip: ipReal })
    })

    const data = await response.json()
    io.emit('add visit', data)
})

indexRouter.get('/book/:bookId/chapter/:chapterId', async (req, res) => {
    const { username, role, userId } = req.session
    const { bookId, chapterId } = req.params
    const { format } = res.locals
    
    const { paginated = false } = req.query

    const chapter = await (await fetch(`${apiUrl}/manga/${bookId}/chapter/${chapterId}`, { method: 'GET' })).json()

    if(!chapter)
        return res.redirect('/error')

    // ${chapter[0].chapterNumber} / ${chapter[0].chapterTitle}
    res.render('chapter',
        {
            title: `Bibliotech`, data: chapter, format, paginated,
            user: { username, role, userId }
        }
    )
})

indexRouter.get('/author-request', async (req, res) => {
    const { username, role, userId } = req.session
    
    res.render('author-request',
        {
            title: 'Bibliotech', 
            user: { username, role, userId }
        }
    )
})

indexRouter.post('/author-request', authorRequestValidator, async (req, res) => {
    const { username, role, userId } = req.session

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('author-request',
            {
                title: 'Bibliotech',
                errors: errors.array(),
                values: req.body,
                user: {
                    username, role, userId
                }
            }
        )
    }

    const { bookTitle, bookInfo, termsCheck } = req.body
    const image = req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null

    const response = await fetch(`${apiUrl}/users/author-request`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, bookTitle, bookInfo, image })
    })

    if(!response.ok) {
        const data = await response.json()

        if(data.message.includes('requested')) {
            return res.render('author-request', 
                {    
                    title: 'Bibliotech',
                    user: { username, role, userId },
                    error: 'already_requested'
                }
            )
        }

        return res.redirect('/author-request?error=invalid')
    }

    res.render('author-request', 
        {    
            title: 'Bibliotech',
            user: { username, role, userId },
            error: false
        }
    )
})

export default indexRouter