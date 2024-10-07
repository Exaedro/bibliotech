// Librerias
import express from 'express'
import path from 'node:path'
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

// Archivos de las rutas
import indexRouter from './routes/index.routes.js'
import profileRouter from './routes/profile.routes.js'
import userRouter from './routes/user.routes.js'
import panelRouter from './routes/panel.routes.js'

// Configuracion
appConfig()

// Middlewares
appMiddlewares()

// Variables globales
appGlobals()

// Rutas
appRoutes()

// Socket
appSocket()

// Estaticos
appStatics()

// Encender servidor
server.listen(webApp.get('PORT'), () => {
    console.log('Web en funcionamiento')
})

function appConfig() {
    webApp.set('PORT', process.env.PORT || 4000)
    webApp.set('views', path.join(process.cwd(), 'src/web/views'))
    webApp.set('view engine', 'ejs')
}

function appMiddlewares() {
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
}

function appGlobals() {
    webApp.use((req, res, next) => {
        res.locals.format = format
        next()
    })
}

function appRoutes() {
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
}

function appSocket() {
    io.on('connection', (socket) => {
        socket.on('add visit', async (data) => {
            console.log(data)
        })
        socket.on('update visits', async (data) => {
            console.log(data)
        })
    
        socket.on('add like', async (data) => {
            io.emit('add like', data)
        })
    
        socket.on('remove like', async (data) => {
            console.log(data)
            io.emit('remove like', data)
        })
    })
}

function appStatics() {
    const folderPath = 'src/web/public'
    const routes = [
        '/', 
        '/book', 
        '/manga', 
        '/upload', 
        '/book/:id/chapter', 
        '/book/:id/chapter/:chapterId', 
        '/book/:id/chapters', 
        '/profile', 
        '/profile/:id', 
        '/panel', 
        '/panel/books', 
        '/panel/books/:id', 
        '/panel/users', 
        '/panel/users/:id', 
        '/panel/docs', 
        '/panel/requests'
    ]

    for(const route of routes) {
        webApp.use(route, express.static(path.join(process.cwd(), folderPath)))
    }
}

export default webApp