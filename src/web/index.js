import express from 'express'
import path, { resolve } from 'node:path'
import session from 'express-session'
import { randomUUID } from 'node:crypto'
import multer from 'multer'
import { format } from './utils/format.js'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const webApp = express()
const server = createServer(webApp)
export const io = new Server(server)

// API
import { appApi } from '../api/index.js'

// Configuracion
webApp.set('PORT', process.env.PORT || 4000)
webApp.set('views', path.join(process.cwd(), 'src/web/views'))
webApp.set('view engine', 'ejs')

// Middlewares
webApp.use(express.urlencoded({ extended: false }))
webApp.use(express.json())

webApp.use(session({
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

webApp.use(multer({ storage }).any())

// Variables globales
webApp.use((req, res, next) => {
    res.locals.format = format
    next()
})

// Rutas
import indexRouter from './routes/index.routes.js'
import profileRouter from './routes/profile.routes.js'
import userRouter from './routes/user.routes.js'
import panelRouter from './routes/panel.routes.js'

webApp.use(userRouter)
webApp.use(profileRouter)
webApp.use(indexRouter)
webApp.use(panelRouter)

webApp.use((err, req, res, next) => {
    const { username, role, userId } = req.session

    console.log(err)
    res.status(500).render('error',
        { 
            title: 'Bibliotech - Error', error: true, code: 500,
            user: {
                username, role, userId
            }
        }
    )
})

io.on('connection', (socket) => {
    socket.on('add visit', async (data) => {
        console.log(data)
    })
    socket.on('update visits', async (data) => {
        console.log(data)
    })
})

// Estaticos
webApp.use('/', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/book', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/manga', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/upload', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/book/:id/chapter', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/book/:id/chapter/:chapterId', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/book/:id/chapters', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/profile', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/profile/:id', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/panel', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/panel/books', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/panel/books/:id', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/panel/users', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/panel/users/:id', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/panel/docs', express.static(path.join(process.cwd(), 'src/web/public')))
webApp.use('/panel/requests', express.static(path.join(process.cwd(), 'src/web/public')))

server.listen(webApp.get('PORT'), () => {
    console.log('Web en funcionamiento')
})

export default webApp