import express from 'express'
import path from 'node:path'

const app = express()

// API
import { appApi } from '../api/index.js'

// Configuracion
app.set('PORT', process.env.PORT || 4000)
app.set('views', path.join(process.cwd(), 'web/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Rutas
import indexRouter from './routes/index.routes.js'
app.use(indexRouter)

// Estaticos
app.use(express.static(path.join(process.cwd(), 'web/public')))

app.listen(app.get('PORT'), () => {
    console.log('Web en funcionamiento')
})