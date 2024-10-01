import { Router } from "express";
const panelRouter = new Router()

// Socket
import { io } from '../index.js'

// Email
import Email from "../utils/sendEmail.js";

// Funcion para saber si el usuario esta logeado
import { isAdmin } from '../utils/auth.js'

// Validadores
import { validationResult } from "express-validator";
import { createBookValidator, createUserValidator } from '../utils/validators.js'

// URL de la API de la biblioteca
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

// En todas las rutas despues de /panel se verificara si el usuario es un administrador o no
// panelRouter.get('/panel*', isAdmin)

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

    const data = await (await fetch(`${apiUrl}/books`, { method: 'GET' })).json()

    res.render('panel/books',
        {
            title: 'Bibliotech - Libros', books: data.books,
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/books/original', async (req, res) => {
    const { username, role, userId } = req.session

    const books = await (await fetch(`${apiUrl}/mangas`, { method: 'GET' })).json()

    res.render('panel/authors/books',
        {
            title: 'Bibliotech - Libros', books,
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/books/:id/edit', async (req, res) => {
    const { username, role, userId } = req.session
    const { id } = req.params // Id del libro

    const [book] = await (await fetch(`${apiUrl}/book/${id}`, { method: 'GET' })).json()
    if (book.error) {
        return res.redirect('/panel/error')
    }

    res.render('panel/editBook',
        {
            title: 'Bibliotech - Editar Libro', book,
            user: { username, role, userId }
        }
    )
})

panelRouter.post('/panel/books/:id/edit', async (req, res) => {
    const { id } = req.params
    const { title, author, isbn, date, pages, language, state, publisher, synopsis, image, pdfLink, categories } = req.body
    const file = req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null

    const response = await fetch(`${apiUrl}/book/${id}/edit`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, isbn, date, pages, language, state, publisher, synopsis, image, pdfLink, categories, file })
        }
    )

    const { error } = await response.json()

    if (error == 'required_fields')
        return res.redirect('/panel/books/edit?error=required_fields')

    res.redirect('/book/' + id)
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

panelRouter.post('/panel/books/add', createBookValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('panel/createBook',
            {
                title: 'Bibliotech - Añadir Libro', errors: errors.array(), values: req.body
            }
        )
    }

    const { title, author, isbn, date, pages, language, state, publisher, synopsis, pdfLink, categories } = req.body
    const image = req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null

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
    if (error == 'required_fields')
        return res.redirect('/panel/books/add?error=required_fields')

    if (!response.ok)
        return res.redirect('/panel/books/add?error=invalid')

    res.redirect('/panel/books')
})

panelRouter.get('/panel/users', async (req, res) => {
    const { username, role, userId } = req.session

    const users = await (await fetch(`${apiUrl}/users`, { method: 'GET' })).json()

    res.render('panel/users',
        {
            title: 'Bibliotech - Usuarios', users,
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/users/:id/edit', async (req, res) => {
    const { username, role, userId } = req.session
    const { id } = req.params

    const user = await (await fetch(`${apiUrl}/user/${id}`, { method: 'GET' })).json()

    res.render('panel/editUser',
        {
            title: 'Bibliotech - Editar Usuario',
            user: { username, role, userId },
            userProfile: { id: user.id, username: user.username, image: user.image, email: user.email, role: user.roleId }
        }
    )
})

panelRouter.post('/panel/users/:id/edit', async (req, res) => {
    const { id } = req.params
    const { username, email, role } = req.body
    const file = req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null

    const response = await fetch(`${apiUrl}/users/edit`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, username, email, role, avatar: file })
        }
    )

    const user = await response.json()

    if (user.message.includes('not'))
        return res.redirect('/panel/users/edit?error=user_not_exist')

    if (!response.ok)
        return res.redirect('/panel/error')

    res.redirect('/panel/users')
})

panelRouter.get('/panel/users/create', async (req, res) => {
    const { username, role, userId } = req.session
    const { error } = req.query

    res.render('panel/createUser',
        {
            title: 'Bibliotech - Crear Usuario',
            user: { username, role, userId },
            error
        }
    )
})

panelRouter.post('/panel/users/create', createUserValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('panel/createUser',
            {
                title: 'Bibliotech - Crear Usuario', errors: errors.array(), values: req.body
            }
        )
    }

    const { name, email, password, confirmPassword, role } = req.body
    const image = req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null

    console.log(image)
    if (!name || !email || !password || !confirmPassword || !role || !image)
        return res.redirect('/panel/users/create?error=required_fields')

    if (password !== confirmPassword)
        return res.redirect('/panel/users/create?error=passwords_dont_match')

    const user = await fetch(`${apiUrl}/users/create`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: name, email, password, role, image })
        }
    )

    const response = await user.json()

    if (response.message.includes('used')) {
        return res.redirect('/panel/users/create?error=username_used')
    }

    if (!user.ok) {
        console.log(response)
        return res.redirect('/panel/users/create?error=invalid')
    }

    res.redirect('/panel/users')
})

panelRouter.get('/panel/docs/api', async (req, res) => {
    const { username, role, userId } = req.session

    res.render('panel/api',
        {
            title: 'Bibliotech - Documentación API',
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/docs/manual', async (req, res) => {
    const { username, role, userId } = req.session

    res.render('panel/manual',
        {
            title: 'Bibliotech - Manual del programador',
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/docs/reports', async (req, res) => {
    const { username, role, userId } = req.session

    res.render('panel/reports',
        {
            title: 'Bibliotech - Informes',
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/error', async (req, res) => {
    const { username, role, userId } = req.session

    res.render('panel/error',
        {
            title: 'Bibliotech - Error',
            user: { username, role, userId }
        }
    )
})

panelRouter.get('/panel/requests', async (req, res) => {
    const { username, role, userId } = req.session

    const requests = await (await fetch(`${apiUrl}/users/author-requests`, { method: 'GET' })).json()

    console.log(requests)
    res.render('panel/authors/requests',
        {
            title: 'Bibliotech - Solicitudes',
            user: { username, role, userId },
            requests
        }
    )
})

panelRouter.get('/panel/requests/:id', async (req, res) => {
    const { username, role, userId } = req.session
    const { id } = req.params

    const request = await (await fetch(`${apiUrl}/users/author-request/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json()

    console.log(request)

    if(request.error == 'user_not_exists')
        return res.redirect('/panel/error')

    res.render('panel/authors/request',
        {
            title: 'Bibliotech - Solicitud de autor',
            user: { username, role, userId },
            request
        }
    )
})

panelRouter.post('/panel/requests/:id/decline', async (req, res) => {
    const { userEmail, declineMessage } = req.body 
    const { id } = req.params

    const response = await fetch(
        `${apiUrl}/users/author-request/decline`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authorId: id })
        }
    );

    if(!response.ok)
        return res.redirect(`/panel/requests/${id}?error=something_went_wrong`)

    try {
        const email = new Email({ email: process.env.EMAIL_ACCOUNT })
        await email.send({ to: userEmail, subject: 'Bibliotech - Solicitud de autor rechazada.', text: declineMessage })
    } catch(err) {
        console.error(err)
        return res.redirect(`/panel/requests/${id}?error=email_not_sent`)
    }

    res.redirect('/panel/requests')
})

panelRouter.post('/panel/requests/:id/approve', async (req, res) => {
    const { userEmail, userId } = req.body
    const { id } = req.params
    
    const response = await fetch(
        `${apiUrl}/users/author-request/approve`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, authorId: id })
        }
    );

    if(!response.ok)
        return res.redirect(`/panel/requests/${id}?error=something_went_wrong`)

    try {
        const email = new Email({ email: process.env.EMAIL_ACCOUNT })
        await email.send({ to: userEmail, subject: 'Bibliotech - Solicitud de autor aprobada.', text: 'Su solicitud ha sido aprobada.' })
    } catch(err) {
        console.error(err)
        return res.redirect(`/panel/requests/${id}?error=email_not_sent`)
    }

    res.redirect('/panel/requests')
})

panelRouter.get('/panel/statistics', async (req, res) => {
    const { username, role, userId } = req.session

    const allVisited = await (await fetch(`${apiUrl}/books/visited?limit=99999`, { method: 'GET' })).json()
    const threeMostVisited = await (await fetch(`${apiUrl}/books/visited?limit=3`, { method: 'GET' })).json()

    const mostVisitedTitles = threeMostVisited.map(visit => visit.title)
    const mostVisitedVisits = threeMostVisited.map(visit => visit.visits)

    res.render('panel/statistics',
        {
            title: 'Bibliotech - Estadísticas', 
            mostVisited: {  
                titles: mostVisitedTitles, 
                visits: mostVisitedVisits
            },
            books: allVisited,
            user: { 
                username, role, userId 
            }
        }
    )
})

export default panelRouter