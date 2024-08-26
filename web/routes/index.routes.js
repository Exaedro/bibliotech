import { Router } from "express";
const indexRouter = new Router()

// URL de la api
import config from '../config.json' with { type: 'json' }
const apiUrl = config["apiUrl"]

indexRouter.get('/', async (req, res) => {
    const books = await (await fetch(`${apiUrl}/book/all`)).json()

    console.log(books)
    res.render('index', { nombre: 'pelotudo' })
})

export default indexRouter