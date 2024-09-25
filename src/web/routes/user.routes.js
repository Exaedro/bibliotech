import { Router } from 'express'
const userRouter = new Router()

// Validadores
import { validationResult } from 'express-validator'
import { createChapterValidator } from '../utils/validators.js'

// URL de la api
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

userRouter.get('/login', async (req, res) => {
    const { error } = req.query

    res.render('login',
        {
            title: "Bibliotech - Iniciar sesión", error
        }
    )
})
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    const response = await fetch(`${apiUrl}/users/login`,
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

    req.session.userId = user.id
    req.session.username = user.username
    req.session.role = user.role
    req.session.image = user.image
    req.session.autor = user.autor

    res.redirect('/')
})

userRouter.get('/register', async (req, res) => {
    res.render('register',
        {
            title: 'Bibliotech - Registro'
        }
    )
})
userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const response = await fetch(`${apiUrl}/users/create`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        }
    )

    if (!response.ok) { 
        const { message, error } = await response.json()
        console.log(message, error)
        
        return res.status(404).redirect('/register')
    }

    res.status(200).redirect('/login')
})

userRouter.get('/logout', async (req, res) => {
    const { userId } = req.session
    
    if(userId) {
        req.session.destroy()
        res.redirect('/')
    }
})

userRouter.get('/upload/book', async (req, res) => {
    const { username, role, userId } = req.session

    res.render('uploadOriginalBook',
        {
            title: 'Bibliotech - Subir libro', 
            user: { username, role, userId }
        }
    )
})

userRouter.post('/upload/book', async (req, res) => {
    const { userId } = req.session
    const { title, type, synopsis, categories } = req.body
    const image = req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null

    const response = await fetch(`${apiUrl}/mangas/add`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, type, synopsis, categories, image, userId })
    })

    if(!response.ok)
        return res.redirect('/upload/book?error=invalid')

    const [manga] = (await response.json()).manga

    console.log(manga)
    res.redirect(`/book/${manga.id}`)
})

userRouter.get('/book/:id/chapters/upload', async (req, res) => {
    const { username, role, userId } = req.session

    // Id del libro
    const { id } = req.params

    res.render('uploadChapter',
        {
            title: 'Bibliotech - Subir capitulo', 
            user: { username, role, userId },
            bookId: id
        }
    )
})

userRouter.post('/book/:id/chapters/upload', createChapterValidator, async (req, res) => {
    const { username, role, userId } = req.session
    // Id del libro
    const { id } = req.params

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('uploadChapter',
            {
                title: 'Bibliotech - Subir capítulo', bookId: id,
                errors: errors.array(),
                values: req.body,
                user: {
                    username, role, userId
                }
            }
        )
    }

    const { chapterTitle, chapterNumber } = req.body

    const response = await fetch(`${apiUrl}/mangas/chapter/add`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, chapterNumber, chapterTitle })
    })

    // Si no se crea el capitulo
    if(!response.ok) { 
        return res.redirect(`/book/${id}/chapters/upload?error=invalid`)
    }

    const data = await response.json()

    // Id del capitulo
    const chapterId = data.chapterId

    // Imagenes del capitulo
    const images = req.files

    if(!images)
        return res.redirect(`/book/${id}/chapters/upload?error=images_missing`)

    const response2 = await fetch(`${apiUrl}/mangas/chapter/images/add`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, chapterId, images })
    })

    if(!response2.ok)
        return res.redirect('/upload/book?error=invalid')

    res.render('uploadChapter',
        {
            title: 'Bibliotech - Subir libro', 
            user: { username, role, userId },
            bookId: id
        }
    )
})

export default userRouter