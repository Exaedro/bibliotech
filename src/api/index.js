import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export const appApi = express()

// Base de datos
// import db from './database.js'
// db.authenticate()

// Configuracion
appApi.set('PORT', 3000 || process.env.PORT)
appApi.set('json spaces', 2)

// Middlewares
// appApi.use(morgan('dev'))
appApi.use(express.urlencoded({ extended: false }))
appApi.use(express.json())
appApi.use(cors())

// Rutas
import bookRouter from './routes/book.routes.js'
import commentRouter from './routes/comment.routes.js'
import userRouter from './routes/user.routes.js'

appApi.use(userRouter)
appApi.use(bookRouter)
appApi.use(commentRouter)

// Manejador de errores
appApi.use((err, req, res, next) => {
    const { message, statusCode } = err
    res.status(statusCode).json({ message, error: true })
})

appApi.listen(appApi.get('PORT'), () => {
    console.log('API en funcionamiento')
})