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
    const { username, role, userId, autor } = req.session
    let { title, genre, author, date, isbn, pages, language, publisher, page } = req.query
    
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
        data = await (await fetch(`${apiUrl}/books/search?title=${title}&author=${author}&date=${date}&genre=${genre}&isbn=${isbn}&pages=${pages}&language=${language}&publisher=${publisher}&page=${page}`)).json()
    }

    const categories = await (await fetch(`${apiUrl}/books/categories`)).json()

    res.render('catalog',
        {
            title: 'Bibliotech - Catalogo', books: data.books, categories, booksCount: data.data.totalBooks, pageSelected: page,
            user: { username, role, userId, autor }
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

    console.log(book)
    res.render('book',
        {
            title: `Bibliotech - ${book[0].title}`, book, comments, format,
            user: { username, role, userId }
        }
    )

    await fetch(`${apiUrl}/book/add/visit`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: book[0].id })
    })
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

/*
    TODO: Añadir validaciones
*/
indexRouter.post('/author-request', async (req, res) => {
    // ! SACAR EL "= 3" CUANDO SE TERMINEN LAS PRUEBAS
    const { username, role, userId } = req.session
    const { bookTitle, bookInfo, termsCheck } = req.body
    const image = req.files ? `/uploads/${req.files[0].filename}` : null

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
        console.log(data)

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