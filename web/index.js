import express from 'express'
import path from 'node:path'
import session from 'express-session'

const app = express()

// API
import { appApi } from '../api/index.js'

// Cors
import { corsMiddleware } from './middlewares/cors.js'

// Configuracion
app.set('PORT', process.env.PORT || 4000)
app.set('views', path.join(process.cwd(), 'web/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
    secret: 'keyboard cat', // CAMBIAR Y GUARDAR EN OTRO LADO MAS TARDE
    resave: true,
    saveUninitialized: true,
}))

// Rutas
import indexRouter from './routes/index.routes.js'
import profileRouter from './routes/profile.routes.js'
import userRouter from './routes/user.routes.js'

app.use(userRouter)
app.use(profileRouter)
app.use(indexRouter)

// Estaticos
app.use('/', express.static(path.join(process.cwd(), 'web/public')))
app.use('/book', express.static(path.join(process.cwd(), 'web/public')))
app.use('/profile', express.static(path.join(process.cwd(), 'web/public')))

app.listen(app.get('PORT'), () => {
    console.log('Web en funcionamiento')
})