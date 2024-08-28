import { Router } from "express";
const panelRouter = new Router()

// Funcion para saber si el usuario esta logeado
import { isAdmin } from '../utils/auth.js'

// URL de la API de la biblioteca
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

// En todas las rutas despues de /panel se verificara si el usuario es un administrador o no
panelRouter.get('/panel*', isAdmin)

panelRouter.get('/panel', (req, res) => {
    const { username, role, userId } = req.session

    res.render('panel/panel', 
        {
            title: 'Bibliotech - Panel de Administrador',
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/books', async (req, res) => {
    const { username, role, userId } = req.session

    const books = await (await fetch(`${apiUrl}/book/all`, { method: 'GET' })).json()

    res.render('panel/books',
        {
            title: 'Bibliotech - Libros', books,
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/books/:id/edit', async (req, res) => {
    const { username, role, userId } = req.session
    const { id } = req.params // Id del libro

    const book = await (await fetch(`${apiUrl}/book/${id}`, { method: 'GET' })).json()

    res.render('panel/editBook', 
        {
            title: 'Bibliotech - Editar Libro', book,
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/books/add', async (req, res) => {
    const { username, role, userId } = req.session

    res.render('panel/createBook',
        {
            title: 'Bibliotech - Añadir Libro',
            user: { username, role, userId }
        }
    )
})

panelRouter.post('/panel/books/add', async (req, res) => {
    const { title, author, isbn, date, pages, language, state, publisher, synopsis, pdfLink, categories } = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : null

    const response = await fetch(`${apiUrl}/book/create`, 
        { 
            method: 'POST',
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ title, author, isbn, date, pages, language, publisher, synopsis, image, pdfLink, state, categories })
        }
    )

    const { error } = await response.json()
    if(error == 'required_fields')
        return res.redirect('/panel/books/add?error=required_fields')

    if(!response.ok)
        return res.redirect('/panel/books/add?error=invalid')

    res.redirect('/panel/books')
})

export default panelRouter