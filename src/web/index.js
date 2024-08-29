import express from 'express'
import path, { resolve } from 'node:path'
import session from 'express-session'
import { randomUUID } from 'node:crypto'
import multer from 'multer'
import { format } from 'timeago.js'

const app = express()

// API
import { appApi } from '../api/index.js'

// Configuracion
app.set('PORT', process.env.PORT || 4000)
app.set('views', path.join(process.cwd(), 'src/web/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat', // CAMBIAR Y GUARDAR EN OTRO LADO MAS TARDE
    resave: true,
    saveUninitialized: true,
}))

const storage = multer.diskStorage({
    destination: path.join(process.cwd(), 'src/web/public/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, randomUUID() + path.extname(file.originalname))
    }
}) 
app.use(multer({ storage }).single('image'))

// Variables globales
app.use((req, res, next) => {
    res.locals.format = format
    next()
})

// Rutas
import indexRouter from './routes/index.routes.js'
import profileRouter from './routes/profile.routes.js'
import userRouter from './routes/user.routes.js'
import panelRouter from './routes/panel.routes.js'

app.use(userRouter)
app.use(profileRouter)
app.use(indexRouter)
app.use(panelRouter)

// Estaticos
app.use('/', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/book', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/profile', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/panel', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/panel/books', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/panel/books/:id', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/panel/users', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/panel/docs', express.static(path.join(process.cwd(), 'src/web/public')))

app.listen(app.get('PORT'), () => {
    console.log('Web en funcionamiento')
})